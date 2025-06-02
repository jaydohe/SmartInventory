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

        var result = listDemands
            .OrderBy(f => f.Period)
            .Select(f => new DemandForecastResponse()
        {
            ProductId = f.ProductId ?? string.Empty,
            ProductName = f.Product?.Name ?? string.Empty,
            ProductUnit = f.Product?.Unit ?? string.Empty,
            WarehouseId = f.WarehouseId,
            WarehouseName = f.Warehouse?.Name ?? string.Empty,
            Period = f.Period ?? string.Empty,
            ForecastValue = f.ForecastValue ?? 0,
            Method = f.Method ?? string.Empty,
            Trend = f.Trend ?? 0,
            Seasonal = f.Seasonal ?? 0,
            SeasonalityPeriod = f.SeasonalityPeriod ?? 0,
            LowerBound = f.LowerBound ?? 0,
            UpperBound = f.UpperBound ?? 0,
            CreatedAt = f.CreatedAt
        }).ToList();

        return result;
    }
}