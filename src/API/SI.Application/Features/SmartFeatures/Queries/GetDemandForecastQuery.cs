using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SmartContract;
using SI.Domain.Entities;

namespace SI.Application.Features.SmartFeatures.Queries;

public class GetDemandForecastQuery(string wareId, string from, string to) : IQuery<List<DemandForecastResponse>>
{
    public string WarehouseId { get; set; } = wareId;
    public string FromPeriod { get; set; } = from; // "2024-01", "2024-02"
    public string ToPeriod { get; set; } = to; // "2024-01", "2024-02"
}

public class GetDemandForecastQueryHandler(
    IRepository<Forecast> demandForecastRepos) : IQueryHandler<GetDemandForecastQuery, List<DemandForecastResponse>>
{
    public async Task<CTBaseResult<List<DemandForecastResponse>>> Handle(GetDemandForecastQuery request, CancellationToken cancellationToken)
    {
        var listDemands = await demandForecastRepos.BuildQuery
            .Include(x => x.Product)
            .Include(x => x.Warehouse)
            .Where(x => x.WarehouseId == request.WarehouseId
                        && String.Compare(x.Period, request.FromPeriod) >= 0
                        && String.Compare(x.Period, request.ToPeriod) <= 0)
            .ToListAsync(cancellationToken);
        if (listDemands.Count == 0)
            return CTBaseResult.UnProcess("Không tìm thấy dự báo nhu cầu nào thỏa mãn.");

        if (request.FromPeriod == request.ToPeriod)
        {
            var resultSingle = listDemands
            .OrderBy(f => f.Period)
            .Select(f => new DemandForecastResponse()
            {
                ProductId = f.ProductId ?? string.Empty,
                ProductName = f.Product?.Name ?? string.Empty,
                ProductUnit = f.Product?.Unit ?? string.Empty,
                WarehouseId = f.WarehouseId,
                WarehouseName = f.Warehouse?.Name ?? string.Empty,
                FromPeriod = f.Period ?? string.Empty,
                ToPeriod = f.Period ?? string.Empty, // Cùng khoảng thời gian
                ForecastValue = Math.Round(f.ForecastValue ?? 0, 0),
                Method = f.Method ?? string.Empty,
                Trend = Math.Round(f.Trend ?? 0, 2),
                Seasonal = Math.Round(f.Seasonal ?? 0, 2),
                SeasonalityPeriod = f.SeasonalityPeriod ?? 0,
                LowerBound = Math.Round(f.LowerBound ?? 0, 0),
                UpperBound = Math.Round(f.UpperBound ?? 0, 0),
                CreatedAt = f.CreatedAt
            }).ToList();

            return resultSingle;
        }
        else
        {
            var resultMultiMonth = listDemands
            .GroupBy(f => new { f.ProductId, f.WarehouseId })
            .Select(group =>
            {
                var anyItem = group.First();

                double avgForecast = group.Average(f => (f.ForecastValue ?? 0));
                double avgTrend = group.Average(f => (f.Trend ?? 0));
                double avgSeasonal = group.Average(f => (f.Seasonal ?? 0));
                double avgLowerBound = group.Average(f => (f.LowerBound ?? 0));
                double avgUpperBound = group.Average(f => (f.UpperBound ?? 0));

                return new DemandForecastResponse()
                {
                    ProductId = anyItem.ProductId ?? string.Empty,
                    ProductName = anyItem.Product?.Name ?? string.Empty,
                    ProductUnit = anyItem.Product?.Unit ?? string.Empty,
                    WarehouseId = anyItem.WarehouseId,
                    WarehouseName = anyItem.Warehouse?.Name ?? string.Empty,
                    FromPeriod = request.FromPeriod,
                    ToPeriod = request.ToPeriod,
                    ForecastValue = Math.Round(avgForecast, 0),
                    Method = anyItem.Method ?? string.Empty,
                    Trend = Math.Round(avgTrend, 2),
                    Seasonal = Math.Round(avgSeasonal, 2),
                    SeasonalityPeriod = (int)group.Average(f => f.SeasonalityPeriod),
                    LowerBound = Math.Round(avgLowerBound, 0),
                    UpperBound = Math.Round(avgUpperBound, 0),
                    CreatedAt = anyItem.CreatedAt // hoặc lấy max(createdAt) tuỳ mục đích
                };
            })
            .ToList();

            return resultMultiMonth;
        }
    }
}