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
using SI.Domain.Entities.Orders;

namespace SI.Application.Features.OrderFeatures.Queries;

public class GetAllOrderQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllOrderQueryHandler(
    IRepository<Order> orderRepos,
    IRepository<User> userRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllOrderQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllOrderQuery request, CancellationToken cancellationToken)
    {
        var warehouseId = identifierProvider.WarehouseId;
        var role = identifierProvider.Role;
        var userId = identifierProvider.UserId;

        var checkUser = await userRepos.BuildQuery
            .Include(x => x.Employee)
            .FirstOrDefaultAsync(x => x.Id == userId, cancellationToken);

        var queryContext = request.QueryContext;
        var orderQuery = orderRepos.HandleLinqQueryRequestV2(request.QueryContext);
        if (role is "WAREHOUSE_STAFF")
        {
            orderQuery = orderQuery
                .Include(x => x.User)
                .ThenInclude(x => x.Employee)
                .ThenInclude(x => x.Warehouse)
                .Where(x => x.User.Employee.WarehouseId == warehouseId);
        }
        else if (role is "SALESMAN")
        {
            orderQuery = orderQuery
                .Where(x => x.UserId == userId);
        }

        var (executeQuery, totalRecords, totalPages) =
            orderQuery.HandleLinqQueryPageRequestV2(
                queryContext,
                queryContext.IsAscending,
                queryContext.OrderBy);
        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = orderQuery.AsSplitQuery();

        var data = await executeQuery.ProjectDynamic<Order>
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