using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SmartContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.SmartFeatures.Queries;

public class GetDemandForecastQuery(string prodId, string wareId) : IQuery<DemandForecastResponse>
{
    public string ProductId { get; set; } = prodId;
    public string WarehouseId { get; set; } = wareId;
}

public class GetDemandForecastQueryHandler(
    IRepository<Forecast> demandForecastRepos,
    IRepository<Employee> employeeRepos,
    IRepository<Product> productRepos,
    IRepository<Warehouse> warehouseRepos,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetDemandForecastQuery, DemandForecastResponse>
{
    public async Task<CTBaseResult<DemandForecastResponse>> Handle(GetDemandForecastQuery request, CancellationToken cancellationToken)
    {
        var warehouseId = identifierProvider.WarehouseId;
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        var product = await productRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.ProductId, cancellationToken);
        if (product is null)
            return CTBaseResult.UnProcess("Sản phẩm không tồn tại.");

        var warehouse = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.WarehouseId, cancellationToken);
        if (warehouse is null)
            return CTBaseResult.UnProcess("Kho không tồn tại.");

        var query = demandForecastRepos.BuildQuery
            .Include(f => f.Product)
            .Include(f => f.Warehouse)
            .Where(x => x.Method == "HW-Additive" && x.ProductId == request.ProductId && x.WarehouseId == request.WarehouseId);

        if (role is "WAREHOUSE_STAFF")
        {
            var checkManager = await employeeRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId && x.IsManager == true, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.UnProcess("Chỉ có quản lý kho được truy cập.");
        }

        var forecasts = await query
            .OrderBy(f => f.CreatedAt)
            .ToListAsync(cancellationToken);

        if (!forecasts.Any())
            return CTBaseResult.UnProcess("Không tìm thấy bản ghi dự báo nào.");

        var dtoList = forecasts
            .Select(f => new ForecastData
            {
                Period = f.Period ?? string.Empty,
                ForecastValue = f.ForecastValue,
                Method = f.Method ?? string.Empty,
                Trend = f.Trend,
                Seasonal = f.Seasonal,
                SeasonalityPeriod = f.SeasonalityPeriod ?? 0,
                LowerBound = f.LowerBound ?? 0,
                UpperBound = f.UpperBound ?? 0
            })
            .ToList();

        var createdAt = forecasts.Min(f => f.CreatedAt);

        var response = new DemandForecastResponse
        {
            ProductId = request.ProductId,
            ProductName = product.Name,
            ProductUnit = product.Unit,
            WarehouseId = request.WarehouseId,
            WarehouseName = warehouse.Name,
            CreatedAt = createdAt,
            ForecastData = dtoList
        };

        return response;
    }
}