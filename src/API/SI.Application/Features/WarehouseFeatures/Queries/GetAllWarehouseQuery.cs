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

namespace SI.Application.Features.WarehouseFeatures.Queries;

public class GetAllWarehouseQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{
}

public class GetAllWarehouseQueryHandler(
    IRepository<Warehouse> wareRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllWarehouseQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(
        GetAllWarehouseQuery request, CancellationToken cancellationToken)
    {
        var wareHouseId = identifierProvider.WarehouseId;
        var role = identifierProvider.Role;
        var userId = identifierProvider.UserId;

        var queryContext = request.QueryContext;
        var wareQuery = wareRepos.HandleLinqQueryRequestV2(request.QueryContext);
        if (role is "WAREHOUSE_STAFF")
        {
            wareQuery = wareQuery
                .Where(x => x.Id == wareHouseId);
        }

        var (executeQuery, totalRecords, totalPages) =
            wareQuery.HandleLinqQueryPageRequestV2(
                queryContext,
                queryContext.IsAscending,
                queryContext.OrderBy);
        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = wareQuery.AsSplitQuery();

        var data = await executeQuery.ProjectDynamic<Warehouse>
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
