using CTCore.DynamicQuery.Core.Domain.Interfaces;
using MathNet.Numerics.Statistics;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Quartz;
using SI.Domain.Entities;
using SI.Domain.Entities.Orders;
using SI.Domain.Enums;
using System.Globalization;

namespace SI.Infrastructure.Integrations.CronJob;

public class HoltWintersJob(
    IRepository<OrderDetail> orderDetailRepository,
    IRepository<Forecast> forecastRepository,
    IUnitOfWork unitOfWork,
    ILogger<HoltWintersJob> logger
) : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        var now = DateTimeOffset.UtcNow;

        // Xóa các bản ghi Holt-Winters cũ cho 3 tháng tới
        var periodsToClean = new[]
        {
                now.AddMonths(1).ToString("yyyy-MM", CultureInfo.InvariantCulture),
                now.AddMonths(2).ToString("yyyy-MM", CultureInfo.InvariantCulture),
                now.AddMonths(3).ToString("yyyy-MM", CultureInfo.InvariantCulture)
        };

        var allHW = await forecastRepository.BuildQuery
            .Where(x => x.Method == "HW-Additive")
            .ToListAsync();

        var oldHWRecords = allHW
            .Where(x => periodsToClean.Contains(x.Period))
            .ToList();

        if (oldHWRecords.Any())
        {
            foreach (var record in oldHWRecords)
            { 
                forecastRepository.Remove(record);
            }
        }

        // Lấy tất cả các đơn hàng đã hoàn thành
        var getAllOrderDetail = await orderDetailRepository.BuildQuery
            .Include(x => x.Order)
            .Where(x => x.Order != null && x.Order.OrderStatus == OrderStatus.DELIVERED)
            .GroupBy(x => new { x.ProductId, x.Order.WarehouseId })
            .Select(g => new
            {
                g.Key.ProductId,
                g.Key.WarehouseId,
            })
            .ToListAsync();

        foreach (var item in getAllOrderDetail)
        {
            var history = await orderDetailRepository.BuildQuery
                .Include(x => x.Order)
                .Where(x => x.ProductId == item.ProductId &&
                            x.Order.WarehouseId == item.WarehouseId)
                .GroupBy(o => new { o.CreatedAt.UtcDateTime.Year, o.CreatedAt.UtcDateTime.Month })
                .OrderBy(g => g.Key.Year).ThenBy(g => g.Key.Month)
                .Select(g => (double)g.Sum(x => x.Quantity))
                .ToListAsync();

            if (history.Count < 6)
            {
                logger.LogWarning("Dữ liệu không đủ để tính Holt-Winters.");
                continue;
            }

            double alpha = 0.3, beta = 0.05, gamma = 0.1;
            int m = Math.Min(12, history.Count / 2);
            int T = history.Count;

            var level = new double[T];
            var trend = new double[T];
            var seasonal = new double[m];

            // 1. Level = trung bình của chu kỳ đầu
            var firstPeriod = history.Take(m).ToList();
            level[0] = firstPeriod.Average();

            // 2. Trend = slope trung bình giữa 2 chu kỳ đầu
            if (history.Count >= 2 * m)
            {
                var secondPeriod = history.Skip(m).Take(m).ToList();
                var firstAvg = firstPeriod.Average();
                var secondAvg = secondPeriod.Average();
                trend[0] = (secondAvg - firstAvg) / (double)m;

                // CAP TREND để tránh quá lớn
                var avgHistorical = history.Average();
                var maxTrend = avgHistorical * 0.1; // Trend không quá 10% average
                trend[0] = Math.Max(-maxTrend, Math.Min(maxTrend, trend[0]));
            }
            else
            {
                trend[0] = 0; // Không đủ data thì trend = 0
            }

            // 3. Seasonal = detrended values
            for (int i = 0; i < m && i < history.Count; i++)
            {
                seasonal[i] = history[i] - level[0];
            }

            // HOLT-WINTERS ITERATIONS
            for (int t = 1; t < T; t++)
            {
                double lastLevel = level[t - 1];
                double lastTrend = trend[t - 1];
                double lastSeason = seasonal[t % m];

                // Level smoothing
                level[t] = alpha * (history[t] - lastSeason) + (1 - alpha) * (lastLevel + lastTrend);

                // Trend smoothing với constraint
                var newTrend = beta * (level[t] - lastLevel) + (1 - beta) * lastTrend;
                var maxTrendConstraint = level[t] * 0.15; // Trend không quá 15% level
                trend[t] = Math.Max(-maxTrendConstraint, Math.Min(maxTrendConstraint, newTrend));

                // Seasonal smoothing
                seasonal[t % m] = gamma * (history[t] - level[t]) + (1 - gamma) * lastSeason;
            }

            // VALIDATION CUỐI
            double stdDev = Statistics.StandardDeviation(history);
            var avgLevel = level.Average();
            var avgTrend = Math.Abs(trend.Average());

            // Kiểm tra tính hợp lý
            if (avgTrend > avgLevel * 0.2) // Trend quá lớn
            {
                logger.LogWarning($"Trend quá cao ({avgTrend:F2}) so với Level ({avgLevel:F2}) của ProductId: {item.ProductId}");
                // Giảm trend xuống
                for (int i = 0; i < trend.Length; i++)
                {
                    trend[i] *= 0.1; // Giảm 90% trend
                }
            }

            // FORECAST 3 THÁNG
            for (int h = 1; h <= 3; h++)
            {
                int t = T - 1;
                double s = seasonal[(t + h) % m];
                double baseForecast = level[t] + h * trend[t] + s;

                // CONSTRAINT FORECAST
                var maxHistorical = history.Max();
                var avgHistorical = history.Average();

                // Forecast không quá 300% max historical
                double forecast = Math.Min(baseForecast, maxHistorical * 3);

                // Forecast không âm
                forecast = Math.Max(0, forecast);

                // Confidence intervals hợp lý hơn
                double lowerBound = Math.Max(0, forecast - 1.96 * stdDev);
                double upperBound = forecast + 1.96 * stdDev;

                var fc = new Forecast
                {
                    ProductId = item.ProductId,
                    WarehouseId = item.WarehouseId,
                    Method = "HW-Additive",
                    Period = now.AddMonths(h).ToString("yyyy-MM", CultureInfo.InvariantCulture),
                    ForecastValue = Math.Round(forecast),
                    Level = level[t],
                    Trend = trend[t],
                    Seasonal = s,
                    ModelParameters = $"{{\"alpha\":{alpha},\"beta\":{beta},\"gamma\":{gamma},\"m\":{m}}}",
                    SeasonalityPeriod = m,
                    LowerBound = lowerBound,
                    UpperBound = upperBound,
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
