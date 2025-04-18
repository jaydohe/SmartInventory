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

namespace SI.Application.Features.CategoryFeatures.Queries;

public class GetAllCategoryQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllCategoryQueryHandler(
    IRepository<Category> repository,
    IRepository<Employee> empRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllCategoryQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllCategoryQuery request, CancellationToken cancellationToken)
    {
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        var queryContext = request.QueryContext;
        var categoryQuery = repository.HandleLinqQueryRequestV2(request.QueryContext);
        if (role is "WAREHOUSE_STAFF")
        {
            var checkManager = await empRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId && x.IsManager == true, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.UnProcess("Just manager can access.");

            categoryQuery = categoryQuery
                .Where(x => x.DeletedOn == null);
        }

        var (executeQuery, totalRecords, totalPages) =
            categoryQuery.HandleLinqQueryPageRequestV2(
            queryContext,
            queryContext.IsAscending,
            queryContext.OrderBy);
        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = categoryQuery.AsSplitQuery();

        var data = await executeQuery.ProjectDynamic<Category>
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
