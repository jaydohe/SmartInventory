using CTCore.DynamicQuery.Core.Domain.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SI.Common.Domain.Events;
using SI.Domain.Entities;
using SI.Domain.Events;

namespace SI.Application.Features.NotificationFeatures.Event;

public class WriteActivityEventHandler(
    IServiceProvider serviceProvider,
    ILogger<WriteActivityEventHandler> logger) :
    IDomainEventHandler<WriteActivityEvent>
{
    private readonly IServiceScope serviceScope = serviceProvider.CreateScope();

    public async Task Handle(WriteActivityEvent notification, CancellationToken cancellationToken)
    {
        var actiRepos = serviceScope.ServiceProvider.GetRequiredService<IRepository<Activity>>();
        var unitOfWork = serviceScope.ServiceProvider.GetRequiredService<IUnitOfWork>();
        
        actiRepos.Add(notification.Payload.ToArray());

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret < 0) {
            logger.LogWarning($"Failure to saving in {nameof(WriteActivityEventHandler)}");
            return;
        }
    }
}