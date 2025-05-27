using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SmartContract;
using SI.Domain.Entities;

namespace SI.Application.Features.SmartFeatures.Queries;

public class GetInventoryOptimizationQuery(string prodId, string wareId) : IQuery<InventoryOptimizationResponse>
{
    public string ProductId { get; set; } = prodId;
    public string WarehouseId { get; set; } = wareId;
}

public class GetInventoryOptimizationQueryHandler(
    IRepository<Forecast> forecastRepos) : IQueryHandler<GetInventoryOptimizationQuery, InventoryOptimizationResponse>
{
    public async Task<CTBaseResult<InventoryOptimizationResponse>> Handle(GetInventoryOptimizationQuery request, CancellationToken cancellationToken)
    {
        var forecast = await forecastRepos.BuildQuery
            .Include(x => x.Product)
            .Include(x => x.Warehouse)
            .FirstOrDefaultAsync(x => x.ProductId == request.ProductId && x.WarehouseId == request.WarehouseId, cancellationToken);
        if (forecast is null)
            return CTBaseResult.NotFound("Tối ưu tồn kho");

        return new InventoryOptimizationResponse()
        {
            ProductId = forecast.ProductId ?? string.Empty,
            ProductName = forecast.Product?.Name ?? string.Empty,
            ProductUnit = forecast.Product?.Unit ?? string.Empty,
            WarehouseId = forecast.WarehouseId,
            WarehouseName = forecast.Warehouse?.Name ?? string.Empty,
            Method = forecast.Method ?? string.Empty,
            EOQ = forecast.EOQ ?? 0,
            SafetyStock = forecast.SafetyStock ?? 0,
            OptimalInventory = forecast.OptimalInventory ?? 0,
            CreatedAt = forecast.CreatedAt
        };
    }
}