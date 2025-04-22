using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Mapster;
using Microsoft.EntityFrameworkCore;
using SI.Contract.OrderContract;
using SI.Domain.Entities.Orders;

namespace SI.Application.Features.OrderFeatures.Queries;

public class GetAllOrderQuery() : IQuery<List<OrderResult>>
{ }

public class GetAllOrderQueryHandler(
    IRepository<Order> orderRepos) : IQueryHandler<GetAllOrderQuery, List<OrderResult>>
{
    public async Task<CTBaseResult<List<OrderResult>>> Handle(GetAllOrderQuery request, CancellationToken cancellationToken)
    {
        var getOrder = await orderRepos.BuildQuery
                    .AsNoTracking()
                    .Include(e => e.OrderDetails)!
                    .ToListAsync(cancellationToken: cancellationToken);
        if (getOrder is null)
            return CTBaseResult.UnProcess("Order do not have result.");

        return getOrder.Select(o => new OrderResult
        {
            Id = o.Id,
            Code = o.Code,
            AgencyId = o.AgencyId,
            TotalAmount = o.TotalAmount,
            IsRefund = o.IsRefund,
            OrderStatus = o.OrderStatus,
            CreatedAt = o.CreatedAt,
            ModifiedOn = o.ModifiedOn,
            DeletedOn = o.DeletedOn,
            Details = o.OrderDetails!.Select(e =>
                new OrderDetailDTO
                {
                    Id = e.Id,
                    ProductId = e.ProductId,
                    Quantity = e.Quantity,
                    UnitPrice = e.UnitPrice
                }
            ).ToList()
        }).ToList();
    }
}
