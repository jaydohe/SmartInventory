using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using Microsoft.EntityFrameworkCore;
using SI.Contract.EmployeeContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.EmployeeFeatures.Queries;

public class GetAllEmployeeQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllEmployeeQueryHandler(
    IRepository<Employee> employeeRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllEmployeeQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllEmployeeQuery request, CancellationToken cancellationToken)
    {
        var wareId = identifierProvider.WareId;
        var role = identifierProvider.Role;

        var queryContext = request.QueryContext;
        var employeeQuery = employeeRepos.HandleLinqQueryRequestV2(request.QueryContext);
        if (role is "WAREHOUSE_STAFF")
        {
            employeeQuery = employeeQuery.Where(x => x.WarehouseId == wareId);
        }
        else if (role is "WAREHOUSE_PRODUCER" || role is "SALESMAN")
        {
            return CTBaseResult.UnProcess("You don't have permission to access this resource");
        }

        var (executeQuery, totalRecords, totalPages) =
            employeeQuery.HandleLinqQueryPageRequestV2(
            queryContext,
            queryContext.IsAscending,
            queryContext.OrderBy);

        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = employeeQuery.AsSplitQuery();

        var data = await executeQuery.ProjectDynamic<EmployeeDTO>
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
