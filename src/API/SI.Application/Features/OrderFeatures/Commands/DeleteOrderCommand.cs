using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities.Orders;
using SI.Domain.Enums;

namespace SI.Application.Features.OrderFeatures.Commands;

public class DeleteOrderCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteOrderCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Order> orderRepos,
    IRepository<OrderDetail> orderDetailRepos) : ICommandHandler<DeleteOrderCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
    {
        var checkOrder = await orderRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkOrder is null)
            return CTBaseResult.NotFound("Order");
        if (checkOrder.OrderStatus != OrderStatus.NEW)
            return CTBaseResult.UnProcess("Order is not NEW, so can not delete.");

        var checkOrderDetail = await orderDetailRepos.BuildQuery
            .Where(x => x.OrderId == checkOrder.Id && x.DeletedOn == null)
            .ToListAsync(cancellationToken);
        if (checkOrderDetail != null)
        {
            foreach (var item in checkOrderDetail)
            {
                orderDetailRepos.Remove(item);
            }
        }
        orderRepos.Remove(checkOrder);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}