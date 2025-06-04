using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Authenticate;
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
    IRepository<OrderDetail> orderDetailRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<DeleteOrderCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
    {
        var userId = identifierProvider.UserId;

        var checkOrder = await orderRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkOrder is null)
            return CTBaseResult.NotFound("Đơn hàng");
        if (checkOrder.OrderStatus != OrderStatus.NEW)
            return CTBaseResult.UnProcess("Trạng thái của đơn hàng không phải là mới tạo.");
        if (checkOrder.OrderStatus == OrderStatus.NEW && checkOrder.UserId != userId)
            return CTBaseResult.UnProcess(" Đơn hàng không phải do bạn tạo.");

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