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
        var checkOrder = await orderRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkOrder is null)
            return CTBaseResult.NotFound("Đơn hàng");
        if (checkOrder.OrderStatus == request.Arg.OrderStatus)
            return CTBaseResult.UnProcess("Trạng thái của đơn hàng không thay đổi.");

        if (request.Arg.OrderStatus == OrderStatus.NEW)
            return CTBaseResult.UnProcess("Trạng thái của đơn hàng không được cập nhật thành mới tạo.");

        if (checkOrder.OrderStatus == OrderStatus.CANCELED)
            return CTBaseResult.UnProcess("Đơn hàng đã hủy.");

        if (checkOrder.OrderStatus == OrderStatus.DELIVERED)
            return CTBaseResult.UnProcess("Đơn hàng đã được giao.");

        checkOrder.OrderStatus = request.Arg.OrderStatus ?? checkOrder.OrderStatus;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}