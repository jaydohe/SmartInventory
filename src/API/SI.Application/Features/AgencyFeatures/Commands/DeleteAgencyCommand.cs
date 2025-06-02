using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;
using SI.Domain.Entities.Orders;
using SI.Domain.Enums;

namespace SI.Application.Features.AgencyFeatures.Commands;

public class DeleteAgencyCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteAgencyCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Agency> agencyRepos,
    IRepository<Order> orderRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<DeleteAgencyCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteAgencyCommand request, CancellationToken cancellationToken)
    {
        var checkAgency = await agencyRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkAgency is null)
            return CTBaseResult.NotFound("Đại lý");

        var checkOrder = await orderRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.OrderStatus != OrderStatus.DELIVERED
                && x.AgencyId == checkAgency.Id && x.DeletedOn == null, cancellationToken);
        if (checkOrder != null)
            return CTBaseResult.UnProcess("Đại lý đang có đơn hàng chưa hoàn thành.");

        checkAgency.DeletedOn = DateTimeOffset.UtcNow;
        checkAgency.ActivityDeleteAgency(identifierProvider.Name, identifierProvider.Role, identifierProvider.WarehouseId);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}