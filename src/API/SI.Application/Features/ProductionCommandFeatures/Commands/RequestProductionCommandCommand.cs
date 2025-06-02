using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.ProductionCommandContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;
using SI.Domain.Entities.Orders;
using SI.Domain.Entities.ProductionCommands;

namespace SI.Application.Features.ProductionCommandFeatures.Commands;

public class RequestProductionCommandCommand(RequestProductionCommandArg arg) : ICommand<OkResponse>
{
    public RequestProductionCommandArg Arg { get; set; } = arg;
}

public class CreateProductionCommandRequestCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Order> orderRepos,
    IRepository<User> userRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<RequestProductionCommandCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(RequestProductionCommandCommand request, CancellationToken cancellationToken)
    {
        var checkOrder = await orderRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.OrderId && x.DeletedOn == null, cancellationToken);
        if (checkOrder == null)
            return CTBaseResult.NotFound("Đơn hàng");

        var checkUserIds = await userRepos.BuildQuery
            .Include(x => x.Employee)
            .Where(x => x.Employee.WarehouseId == request.Arg.WareHouseId && x.Employee.IsManager == true && x.DeletedOn == null)
            .Select(x => x.Id)
            .ToArrayAsync(cancellationToken);

        checkOrder.SendNotifRequestProductionCommand(identifierProvider.UserId, checkOrder.Code, checkUserIds);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}