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
using SI.Domain.Entities.GoodsReceipts;

namespace SI.Application.Features.GoodsReceiptFeatures.Queries;

public class GetAllGoodsReceiptQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllGoodsReceiptQueryHandler(
    IRepository<GoodsReceipt> goodsReceiptRepos,
    IRepository<Employee> employeeRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllGoodsReceiptQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllGoodsReceiptQuery request, CancellationToken cancellationToken)
    {
        var warehouseId = identifierProvider.WarehouseId;
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;
        var userId = identifierProvider.UserId;

        var queryContext = request.QueryContext;
        var goodsReceiptQuery = goodsReceiptRepos.HandleLinqQueryRequestV2(request.QueryContext);

        var checkManager = await employeeRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId, cancellationToken);
        if (checkManager is null)
            return CTBaseResult.NotFound("Nhân viên");

        if (role is "WAREHOUSE_STAFF" && checkManager.IsManager == true)
        {
            goodsReceiptQuery = goodsReceiptQuery
                .Include(x => x.User)
                .ThenInclude(x => x.Employee)
                .Where(x => x.User.Employee.WarehouseId == warehouseId && x.DeletedOn == null);
        }

        if (role is "WAREHOUSE_STAFF" && checkManager.IsManager == false)
        {
            goodsReceiptQuery = goodsReceiptQuery
                .Include(x => x.User)
                .ThenInclude(x => x.Employee)
                .Where(x => x.User.Employee.WarehouseId == warehouseId && x.UserId == userId && x.DeletedOn == null);
        }

        var (executeQuery, totalRecords, totalPages) =
            goodsReceiptQuery.HandleLinqQueryPageRequestV2(
            queryContext,
            queryContext.IsAscending,
            queryContext.OrderBy);
        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = goodsReceiptQuery.AsSplitQuery();
        var data = await executeQuery.ProjectDynamic<GoodsReceipt>
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