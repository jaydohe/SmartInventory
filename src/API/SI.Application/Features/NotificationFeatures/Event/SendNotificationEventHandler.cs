using CTCore.DynamicQuery.Core.Domain.Interfaces;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Hybrid;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using SI.Application.SignalR;
using SI.Application.SignalR.Hubs;
using SI.Common.Domain.Events;
using SI.Domain.Entities;
using SI.Domain.Events;

namespace SI.Application.Features.NotificationFeatures.Event;

public class SendNotificationEventHandler(
    IServiceProvider serviceProvider,
    ILogger<SendNotificationEventHandler> logger,
    IHubContext<MonitorHub, INotificationMonitor> hubContext,
    HybridCache hybridCache) :
    IDomainEventHandler<SendNotificationEvent>
{
    private readonly IServiceScope serviceScope = serviceProvider.CreateScope();
    public async Task Handle(SendNotificationEvent notification, CancellationToken cancellationToken)
    {
        var reposNoti = serviceScope.ServiceProvider.GetRequiredService<IRepository<Notification>>();
        var unitOfWork = serviceScope.ServiceProvider.GetRequiredService<IUnitOfWork>();
        var reposUser = serviceScope.ServiceProvider.GetRequiredService<IRepository<User>>();
        
        var item = notification.Payload.ToArray();
        logger.LogInformation($"Saving {notification.Payload.Count()} notif");
        
        foreach(var i in item){
            logger.LogInformation($"Saving {i.Id} notif");
        }
        reposNoti.Add(item);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret < 0) {
            logger.LogWarning($"Failure to saving in {nameof(SendNotificationEventHandler)}");
            return;
        }
         
        var userCaches = await hybridCache.GetOrCreateAsync(
            "ALL_USER",
            async (token) => await reposUser.BuildQuery.AsNoTracking().ToListAsync(token)
        );
        logger.LogInformation($"Processing {notification.Payload.Count()} notif.");
        var sender = userCaches.Where(e => e.Id == notification.SenderId).FirstOrDefault();
        foreach(var noti in item){
            logger.LogInformation($"Sending {noti.Id} notif");
            if (notification.IsSend) {
                var user = userCaches.Where(e => e.Id == noti.UserId).FirstOrDefault();
            }
            
            var getClient = ApplicationHub.ConnectionGroups
                .Where(e => e.Value.UserId == noti.UserId)
                .ToList();
            
            foreach(var client in getClient) 
            {
                _ = hubContext.Clients.Client(client.Key).Notif(noti.ParseToNotiPayload()).ConfigureAwait(false);
            }
 
        }

    }
}