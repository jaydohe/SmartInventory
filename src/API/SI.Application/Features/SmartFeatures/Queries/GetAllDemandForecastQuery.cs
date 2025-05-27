using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using DocumentFormat.OpenXml.Drawing.Spreadsheet;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SmartContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.SmartFeatures.Queries;

public class GetAllDemandForecastQuery : IQuery<List<DemandForecastResponse>>
{ }

public class GetAllDemandForecastQueryHandler(
    IRepository<Forecast> demandForecastRepos,
    IRepository<Employee> employeeRepos,
    IRepository<Product> productRepos,
    IRepository<Warehouse> warehouseRepos,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllDemandForecastQuery, List<DemandForecastResponse>>
{
    public async Task<CTBaseResult<List<DemandForecastResponse>>> Handle(
        GetAllDemandForecastQuery request,
        CancellationToken cancellationToken)
    {
        var warehouseId = identifierProvider.WarehouseId;
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        var query = demandForecastRepos.BuildQuery
            .Where(x => x.Method == "HW-Additive");

        if (role is "WAREHOUSE_STAFF")
        {
            var checkManager = await employeeRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId && x.IsManager == true, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.UnProcess("Chỉ có quản lý kho được truy cập.");

            query = query.Where(x => x.WarehouseId == warehouseId);
        }

        var forecasts = await query.ToListAsync(cancellationToken);

        var productIds = forecasts.Select(f => f.ProductId).Distinct().ToList();
        var warehouseIds = forecasts.Select(f => f.WarehouseId).Distinct().ToList();

        var allProducts = await productRepos.BuildQuery.ToListAsync(cancellationToken);
        var allWarehouses = await warehouseRepos.BuildQuery.ToListAsync(cancellationToken);

        var productNames = allProducts
            .Where(p => productIds.Contains(p.Id))
            .ToDictionary(p => p.Id, p => p.Name);

        var productUnit = allProducts
            .Where(p => productIds.Contains(p.Id))
            .ToDictionary(p => p.Id, p => p.Unit);

        var warehouseNames = allWarehouses
            .Where(w => warehouseIds.Contains(w.Id))
            .ToDictionary(w => w.Id, w => w.Name);

        var grouped = forecasts
           .GroupBy(f => new { f.ProductId, f.WarehouseId })
           .Select(g =>
           {
               var prodId = g.Key.ProductId;
               var wareId = g.Key.WarehouseId;
               return new DemandForecastResponse
               {
                   ProductId = prodId,
                   ProductName = productNames.TryGetValue(prodId, out var pn) ? pn : string.Empty,
                   ProductUnit = productUnit.TryGetValue(prodId, out var pu) ? pu : string.Empty,
                   WarehouseId = wareId,
                   WarehouseName = warehouseNames.TryGetValue(wareId, out var wn) ? wn : string.Empty,
                   CreatedAt = g.Min(f => f.CreatedAt),
                   ForecastData = g
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
                       .ToList()
               };
           })
           .ToList(); 
        
        return grouped;
    }
}