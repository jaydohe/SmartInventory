using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.InventoryContract;
using SI.Domain.Entities;

namespace SI.Application.Features.InventoryFeatures.Queries;

public class GetInventoryQuery(string productid) : IQuery<List<InventoryDTO>>
{
    public string ProductId { get; set; } = productid;
}

public class GetInventoryQueryHandler(
    IRepository<Inventory> inventoryRepos) : IQueryHandler<GetInventoryQuery, List<InventoryDTO>>
{
    public async Task<CTBaseResult<List<InventoryDTO>>> Handle(GetInventoryQuery request, CancellationToken cancellationToken)
    {
        var listInventories = await inventoryRepos.BuildQuery
            .Include(x => x.Product)
            .Include(x => x.Warehouse)
            .Where(x => x.ProductId == request.ProductId)
            .ToListAsync(cancellationToken);
        if (listInventories.Count == 0)
            return CTBaseResult.UnProcess("Mặt hàng này không có trong tồn kho.");

        var result = listInventories
            .Select(i => new InventoryDTO
            {
                Id = i.Id,
                ProductId = i.ProductId,
                ProductName = i.Product?.Name ?? string.Empty,
                ProductUnit = i.Product?.Unit ?? string.Empty,
                WarehouseId = i.WarehouseId,
                WarehouseName = i.Warehouse?.Name ?? string.Empty,
                Quantity = i.Quantity,
                CreatedAt = i.CreatedAt
            }).ToList();

        return result;
    }
}