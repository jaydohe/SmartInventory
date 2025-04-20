using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.OrderContract;
using SI.Domain.Entities.Orders;

namespace SI.Application.Features.OrderFeatures.Queries;

public class GetOrderQuery(string id) : IQuery<OrderResult>
{
    public string Id { get; set; } = id;
}

public class GetOrderQueryHandler(
    IRepository<Order> orderRepos) : IQueryHandler<GetOrderQuery, OrderResult>
{
    public async Task<CTBaseResult<OrderResult>> Handle(GetOrderQuery request, CancellationToken cancellationToken)
    {
        var getOrder = await orderRepos.BuildQuery
                    .AsNoTracking()
                    .Include(e => e.OrderDetails)!
                    .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken: cancellationToken);
        if (getOrder is null)
            return CTBaseResult.NotFound("Order");

        return new OrderResult()
        {
            Id = getOrder.Id,
            Code = getOrder.Code,
            AgencyId = getOrder.AgencyId,
            TotalAmount = getOrder.TotalAmount,
            IsRefund = getOrder.IsRefund,
            OrderStatus = getOrder.OrderStatus,
            CreatedAt = getOrder.CreatedAt,
            ModifiedOn = getOrder.ModifiedOn,
            DeletedOn = getOrder.DeletedOn,
            Details = getOrder.OrderDetails!.Select(e =>
                new OrderDetailDTO
                {
                    Id = e.Id,
                    ProductId = e.ProductId,
                    Quantity = e.Quantity,
                    UnitPrice = e.UnitPrice
                }
            ).ToList()
        };
    }
}
