using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SmartContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.SmartFeatures.Queries;

public class GetAllInventoryOptimizationQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllInventoryOptimizationQueryHandler(
    IRepository<Forecast> inventoryOptimizationRepos,
    IRepository<Employee> employeeRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllInventoryOptimizationQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllInventoryOptimizationQuery request, CancellationToken cancellationToken)
    {
        var warehouseId = identifierProvider.WarehouseId;
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        var queryContext = request.QueryContext;
        var inventoryOptimizationQuery = inventoryOptimizationRepos.HandleLinqQueryRequestV2(request.QueryContext);
        if (role is "WAREHOUSE_STAFF")
        {
            var checkManager = await employeeRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId && x.IsManager == true, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.UnProcess("Chỉ có quản lý kho được truy cập.");
            inventoryOptimizationQuery = inventoryOptimizationQuery.Where(x => x.WarehouseId == warehouseId && x.Method == "EOQ+SS");
        }
        else
        {
            inventoryOptimizationQuery = inventoryOptimizationQuery.Where(x => x.Method == "EOQ+SS");
        }

        var (executeQuery, totalRecords, totalPages) =
            inventoryOptimizationQuery.HandleLinqQueryPageRequestV2(
            queryContext,
            queryContext.IsAscending,
            queryContext.OrderBy);

        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = inventoryOptimizationQuery.AsSplitQuery();

        var data = await executeQuery.ProjectDynamic<InventoryOptimizationResponse>
            (mapper, new(request.QueryContext.Populate), request.QueryContext.ToCacheKey())
            .ToArrayAsync(cancellationToken);

        var result = new OkDynamicPageResponse(
            data,
            totalRecords,
            totalPages,
            queryContext.Page,
            queryContext.Offset);

        return result;
    }
}