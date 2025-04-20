using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.OrderContract;
using SI.Domain.Entities.Orders;
using SI.Domain.Enums;

namespace SI.Application.Features.OrderFeatures.Commands;

public class UpdateOrderStatusCommand(string id, UpdateOrderStatusArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateOrderStatusArg Arg { get; set; } = arg;
}

public class UpdateOrderStatusCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Order> orderRepos) : ICommandHandler<UpdateOrderStatusCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
    {
        var orderStatus = Enum.Parse<OrderStatus>(request.Arg.OrderStatus);
        if (!Enum.IsDefined(typeof(OrderStatus), orderStatus))
            return CTBaseResult.NotFound("Order Status");

        var checkOrder = await orderRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkOrder is null)
            return CTBaseResult.NotFound("Order");
        if (checkOrder.OrderStatus == orderStatus)
            return CTBaseResult.UnProcess("Order status is same");

        if (orderStatus == OrderStatus.NEW)
            return CTBaseResult.UnProcess("Can not update Order status is new.");
        if (orderStatus == OrderStatus.REFUNDED)
            return CTBaseResult.UnProcess("Can not update Order status is refunded.");
        if (orderStatus == OrderStatus.DELIVERED)
            return CTBaseResult.UnProcess("Can not update Order status is delivered.");

        checkOrder.OrderStatus = orderStatus;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}