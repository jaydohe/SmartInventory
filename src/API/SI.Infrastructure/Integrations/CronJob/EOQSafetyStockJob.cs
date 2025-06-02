using CTCore.DynamicQuery.Core.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Quartz;
using SI.Domain.Entities.Orders;
using SI.Domain.Entities.ProductionCommands;
using SI.Domain.Entities;
using SI.Domain.Enums;
using MathNet.Numerics.Distributions;
using MathNet.Numerics.Statistics;
using System.Globalization;
using SI.Infrastructure.Persistence;

namespace SI.Infrastructure.Integrations.CronJob;

public class EOQSafetyStockJob(
    IRepository<OrderDetail> orderDetailRepository,
    IRepository<Product> productRepository,
    IRepository<Setup> setupRepository,
    IRepository<Warehouse> warehouseRepository,
    IRepository<Forecast> forecastRepository,
    IRepository<ProductionCommandProcess> productionCommandProcessRepository,
    IUnitOfWork unitOfWork,
    ILogger<EOQSafetyStockJob> logger
) : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        var now = DateTime.UtcNow;
        var cal = CultureInfo.InvariantCulture.Calendar;
        var week = cal.GetWeekOfYear(now, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
        var currentPeriod = $"{now.Year}-W{week:D2}";

        // Xóa bản ghi dự báo cũ
        var old = await forecastRepository.BuildQuery
            .Where(f => f.Method == "EOQ+SS")
            .ToListAsync();
        if (old.Any())
        {
            foreach (var item in old)
            {
                forecastRepository.Remove(item);
            }
        }

        // Lấy danh sách tất cả WarehouseId
        var warehouses = await warehouseRepository.BuildQuery
            .Select(w => w.Id)
            .ToListAsync();


        var getZScore = await setupRepository.BuildQuery
            .AsNoTracking()
            .FirstOrDefaultAsync();
        if (getZScore == null)
        {
            logger.LogWarning("Không tìm thấy thiết lập ZScore");
            return;
        }

        foreach (var wareId in warehouses)
        {
            // Lấy top 5 ProductId trong kho này, dựa trên tổng doanh thu (Quantity * UnitPrice) trong năm hiện tại
            var top5Revenue = await orderDetailRepository.BuildQuery
                .Include(x => x.Order)
                .Where(x =>
                    x.Order != null &&
                    x.Order.WarehouseId == wareId &&
                    x.Order.OrderStatus == OrderStatus.DELIVERED
                )
                .GroupBy(x => x.ProductId)
                .Select(g => new
                {
                    ProductId = g.Key,
                    TotalRevenue = g.Sum(x => x.Quantity * x.UnitPrice)
                })
                .OrderByDescending(x => x.TotalRevenue)
                .Take(5)
                .ToListAsync();

            foreach (var demand in top5Revenue)
            {
                var getProduct = await productRepository.BuildQuery
                    .Where(x => x.Id == demand.ProductId)
                    .Select(x => new
                    {
                        x.Id,
                        x.PurchasePrice,
                        x.SellingPrice,
                        x.HoldingCost
                    })
                    .FirstOrDefaultAsync();
                if (getProduct == null)
                {
                    logger.LogWarning($"Không tìm thấy sản phẩm với ID: {demand.ProductId}");
                    continue;
                }

                var totalQuantity = await orderDetailRepository.BuildQuery
                    .Include(x => x.Order)
                    .Where(x =>
                        x.ProductId == demand.ProductId &&
                        x.Order.WarehouseId == wareId &&
                        x.Order.OrderStatus == OrderStatus.DELIVERED
                    )
                    .SumAsync(x => x.Quantity);

                // ZScore được lưu dạng phần trăm (vd: 95 cho 95%)
                double z = Normal.InvCDF(0, 1, (getZScore.ZScore / 100.0));

                // Tính EOQ
                var productionCommand = await productionCommandProcessRepository.BuildQuery
                    .Include(x => x.ProductionCommands)
                    .ThenInclude(x => x.User)
                    .ThenInclude(x => x.Employee)
                    .Include(x => x.ProductionCommands)
                    .ThenInclude(x => x.Details)
                    .Where(x => x.ProductionCommands != null
                        && x.ProductionCommands.Details != null
                        && x.ProductionCommands.Details.Any(detail => detail.ProductId == getProduct.Id)
                        && x.ProductionCommands.Status == CommandStatus.COMPLETED
                        && x.ProductionCommands.User.Employee.WarehouseId == wareId)
                    .Select(x => new
                    {
                        x.ActualStart,
                        x.ActualEnd
                    })
                    .ToListAsync();

                var resultLT = productionCommand.Select(x => new
                {
                    LeadTime = (x.ActualEnd.HasValue && x.ActualStart.HasValue)
                            ? (x.ActualEnd.Value - x.ActualStart.Value).TotalDays / 7.0
                            : 0
                }).ToList();

                var resultLT_L = productionCommand
                    .Select(x => new
                    {
                        LeadTime = (x.ActualEnd.HasValue && x.ActualStart.HasValue)
                        ? (x.ActualEnd.Value - x.ActualStart.Value).TotalDays / 7.0
                        : 0
                    }).ToList();

                double L = productionCommand.Any() ? resultLT_L.Average(x => x.LeadTime) : 1.0;
                double sigma_LT = productionCommand.Count > 1
                    ? Statistics.StandardDeviation(resultLT_L.Select(p => (double)p.LeadTime))
                    : 0.0;

                var totalLeadTime = resultLT.Sum(x => x.LeadTime);
                var D = (double)totalQuantity;
                var S = (double)getProduct.PurchasePrice;
                var H = (double)getProduct.HoldingCost;
                double EOQ = Math.Sqrt((2 * S * D) / H);

                // Tính sigma_d từ biến động nhu cầu theo tuần
                var weekly = await orderDetailRepository.BuildQuery
                    .Include(x => x.Order)
                    .Where(x => x.ProductId == getProduct.Id
                            && x.Order != null
                            && x.Order.OrderStatus == OrderStatus.DELIVERED)
                    .GroupBy(x => new { x.ProductId, Year = x.CreatedAt.UtcDateTime.Year, Week = SIDbContext.WeekOfYear(x.CreatedAt), x.Order.WarehouseId })
                    .Select(g => new
                    {
                        g.Key.ProductId,
                        WeeklyDemand = g.Sum(x => x.Quantity),
                        g.Key.WarehouseId
                    })
                    .ToListAsync();

                double sigma_d = weekly.Count > 1
                    ? Statistics.StandardDeviation(weekly.Select(w => (double)w.WeeklyDemand))
                    : 0.0;

                // Safety Stock đầy đủ:
                // SS = z * sqrt(L*sigmaD^2 + (D/12)^2 * sigmaLT^2) 
                // (nếu D nhập annual, chia kỳ phù hợp; ví dụ nhu cầu trung bình tuần = D/52)
                double avgWeekly = D / 52.0;
                double SS = z * Math.Sqrt((L * Math.Pow(sigma_d, 2)) + (Math.Pow(avgWeekly, 2) * Math.Pow(sigma_LT, 2)));

                var fc = new Forecast
                {
                    WarehouseId = wareId,
                    ProductId = demand.ProductId,
                    Method = "EOQ+SS",
                    Period = currentPeriod,
                    EOQ = EOQ,
                    SafetyStock = SS,
                    OptimalInventory = EOQ + SS,
                    CreatedAt = DateTimeOffset.UtcNow
                };
                forecastRepository.Add(fc);
            }
        }

        var ret = await unitOfWork.SaveChangeAsync();
        if (ret < 0)
        {
            logger.LogWarning($"Failure to saving.");
            return;
        }
    }
}