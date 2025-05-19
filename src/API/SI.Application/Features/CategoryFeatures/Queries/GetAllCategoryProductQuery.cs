using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.CategoryFeatures.Queries;

public class GetAllCategoryWarehouseQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllCategoryWarehouseQueryHandler(
    IRepository<Category> repository,
    IMapper mapper) : IQueryHandler<GetAllCategoryWarehouseQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllCategoryWarehouseQuery request, CancellationToken cancellationToken)
    {
        var queryContext = request.QueryContext;
        var categoryQuery = repository.HandleLinqQueryRequestV2(request.QueryContext);
        categoryQuery = categoryQuery
            .Where(x => x.DeletedOn == null)
            .Where(x => x.CategoryEntityType == CategoryEntityTypes.WAREHOUSE);

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
