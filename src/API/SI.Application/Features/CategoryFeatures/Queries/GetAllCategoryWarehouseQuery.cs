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
using SI.Domain.Enums;

namespace SI.Application.Features.CategoryFeatures.Queries;

public class GetAllCategoryProductQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllCategoryProductQueryHandler(
    IRepository<Category> repository,
    IRepository<Employee> empRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllCategoryProductQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllCategoryProductQuery request, CancellationToken cancellationToken)
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

        categoryQuery = categoryQuery
            .Where(x => x.DeletedOn == null)
            .Where(x => x.CategoryEntityType == CategoryEntityTypes.PRODUCT);

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
