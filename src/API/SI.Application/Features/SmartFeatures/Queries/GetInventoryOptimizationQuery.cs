using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SmartContract;
using SI.Domain.Entities;

namespace SI.Application.Features.SmartFeatures.Queries;

public class GetInventoryOptimizationQuery(string wareId) : IQuery<List<InventoryOptimizationResponse>>
{
    public string WarehouseId { get; set; } = wareId;
}

public class GetInventoryOptimizationQueryHandler(
    IRepository<Forecast> forecastRepos) : IQueryHandler<GetInventoryOptimizationQuery, List<InventoryOptimizationResponse>>
{
    public async Task<CTBaseResult<List<InventoryOptimizationResponse>>> Handle(GetInventoryOptimizationQuery request, CancellationToken cancellationToken)
    {
        var listOptimi = await forecastRepos.BuildQuery
            .Include(x => x.Product)
            .Include(x => x.Warehouse)
            .Where(x => x.WarehouseId == request.WarehouseId)
            .ToListAsync(cancellationToken);
        if (listOptimi.Count == 0)
            return CTBaseResult.UnProcess("Không tìm thấy tối ưu tồn kho nào cho kho này.");

        var result = listOptimi
            .OrderBy(f => f.Period)
            .Select(f => new InventoryOptimizationResponse()
            {
                ProductId = f.ProductId ?? string.Empty,
                ProductName = f.Product?.Name ?? string.Empty,
                ProductUnit = f.Product?.Unit ?? string.Empty,
                WarehouseId = f.WarehouseId,
                WarehouseName = f.Warehouse?.Name ?? string.Empty,
                Method = f.Method ?? string.Empty,
                EOQ = Math.Round(f.EOQ ?? 0, 0),
                SafetyStock = Math.Round(f.SafetyStock ?? 0, 0),
                OptimalInventory = Math.Round((f.EOQ ?? 0) + (f.SafetyStock ?? 0), 0),
                CreatedAt = f.CreatedAt
            }).ToList();

        return result;
    }
}