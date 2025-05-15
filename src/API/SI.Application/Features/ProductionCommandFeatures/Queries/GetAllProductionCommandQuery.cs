using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;
using SI.Domain.Entities.ProductionCommands;

namespace SI.Application.Features.ProductionCommandFeatures.Queries;

public class GetAllProductionCommandQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllProductionCommandQueryHandler(
    IRepository<ProductionCommand> productionCommandRepos,
    IRepository<Employee> employeeRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllProductionCommandQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllProductionCommandQuery request, CancellationToken cancellationToken)
    {
        var warehouseId = identifierProvider.WarehouseId;
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        var queryContext = request.QueryContext;
        var productionCommandQuery = productionCommandRepos.HandleLinqQueryRequestV2(request.QueryContext);
        if (role is "WAREHOUSE_STAFF" || role is "WAREHOUSE_PRODUCER")
        {
            var checkManager = await employeeRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId && x.IsManager == true, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.UnProcess("Just manager can access.");
            productionCommandQuery = productionCommandQuery
                .Include(x => x.User)
                .ThenInclude(x => x.Employee)
                .Where(x => x.User.Employee.WarehouseId == warehouseId && x.DeletedOn == null);
        }

        var (executeQuery, totalRecords, totalPages) =
            productionCommandQuery.HandleLinqQueryPageRequestV2(
            queryContext,
            queryContext.IsAscending,
            queryContext.OrderBy);
        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = productionCommandQuery.AsSplitQuery();

        var data = await executeQuery.ProjectDynamic<ProductionCommand>
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
