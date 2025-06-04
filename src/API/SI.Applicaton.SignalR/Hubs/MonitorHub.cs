using SI.Domain.Events;
using Microsoft.AspNetCore.SignalR;
using SI.Application.SignalR.Types;
using Microsoft.Extensions.Logging;

namespace SI.Application.SignalR.Hubs;

public class MonitorHub
(ILogger<MonitorHub> logger): Hub<INotificationMonitor>
{
    public override async Task OnConnectedAsync()
    {
        var queries = Context.GetHttpContext()!.Request.Query;
        var wareId = queries["warehouseId"].ToString().Trim() ?? "UNKNOW";
        var userId = queries["userId"].ToString().Trim() ?? "UNKNOW";

        await Groups.AddToGroupAsync(Context.ConnectionId, wareId);
        
        ApplicationHub.ConnectionGroups[Context.ConnectionId] = 
            new ClientInfo {
                WareId = wareId,
                UserId = userId,
                Client = Clients.Client(Context.ConnectionId)
            };

        await base.OnConnectedAsync();
    }
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (ApplicationHub.ConnectionGroups.TryRemove(Context.ConnectionId, out var clientInfo))
        {
            var log = $"Connection {Context.ConnectionId} was part of group unit {clientInfo.WareId} - user {clientInfo.UserId}";
            logger.LogInformation(log);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, clientInfo.WareId);
        }
        await base.OnDisconnectedAsync(exception);
    }
}