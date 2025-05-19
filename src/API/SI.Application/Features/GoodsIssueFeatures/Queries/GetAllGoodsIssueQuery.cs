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
using SI.Domain.Entities.GoodsIssues;

namespace SI.Application.Features.GoodsIssueFeatures.Queries;

public class GetAllGoodsIssueQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllGoodsIssueQueryHandler(
    IRepository<GoodsIssue> goodsIssueRepos,
    IRepository<Employee> employeeRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllGoodsIssueQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllGoodsIssueQuery request, CancellationToken cancellationToken)
    {
        var warehouseId = identifierProvider.WarehouseId;
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;
        var userId = identifierProvider.UserId;

        var queryContext = request.QueryContext;
        var goodsIssueQuery = goodsIssueRepos.HandleLinqQueryRequestV2(request.QueryContext);

        var checkManager = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == employeeId, cancellationToken);
        if (checkManager is null)
            return CTBaseResult.NotFound("Employee");

        if (role is "WAREHOUSE_STAFF" && checkManager.IsManager == true)
        {
            goodsIssueQuery = goodsIssueQuery
                .Include(x => x.User)
                .ThenInclude(x => x.Employee)
                .Where(x => x.User.Employee.WarehouseId == warehouseId && x.DeletedOn == null);
        }

        if (role is "WAREHOUSE_STAFF" && checkManager.IsManager == false)
        {
            goodsIssueQuery = goodsIssueQuery
                .Include(x => x.User)
                .ThenInclude(x => x.Employee)
                .Where(x => x.User.Employee.WarehouseId == warehouseId && x.UserId == userId && x.DeletedOn == null);
        }

        var (executeQuery, totalRecords, totalPages) =
            goodsIssueQuery.HandleLinqQueryPageRequestV2(
            queryContext,
            queryContext.IsAscending,
            queryContext.OrderBy);
        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = goodsIssueQuery.AsSplitQuery();
        var data = await executeQuery.ProjectDynamic<GoodsIssue>
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