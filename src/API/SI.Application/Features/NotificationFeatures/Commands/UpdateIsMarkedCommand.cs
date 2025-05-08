using CTCore.DynamicQuery.Common.Definations;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.NotificationContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;


namespace SI.Application.Features.NotificationFeatures.Commands;

public class UpdateIsMarkedCommand(UpdateIsMarkedArg arg) : ICommand<OkResponse>
{
    public string[] NotifIds { get; set; } = arg.NotifIds;
}
public class UpdateIsMarkedCommandHandler
    (IUnitOfWork unitOfWork,
    IRepository<Notification> notiRepos,
    IUserIdentifierProvider userIdentifierProvider)
    : ICommandHandler<UpdateIsMarkedCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateIsMarkedCommand request, CancellationToken cancellationToken)
    {
        var userId = userIdentifierProvider.UserId;
        var notifIds = request.NotifIds;
        var notifications = await notiRepos.BuildQuery
            .Where(e => e.UserId == userId)
            .Where(e => e.IsMarked == false)
            .ToListAsync(cancellationToken);
        foreach (var notification in notifications
            .Where(e => notifIds.Contains(e.Id)).ToList())
        {
            notification.IsMarked = true;
        }

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret < 0)
            return CTBaseResult.Failure(new DbUpdateException(), ErrorCodes.Server);

        return CTBaseResult.Success();
    }
}
