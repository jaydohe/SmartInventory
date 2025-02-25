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
        var unitId = queries["unitId"].ToString().Trim() ?? "UNKNOW";
        var userId = queries["userId"].ToString().Trim() ?? "UNKNOW";

        await Groups.AddToGroupAsync(Context.ConnectionId, unitId);
        
        ApplicationHub.ConnectionGroups[Context.ConnectionId] = 
            new ClientInfo {
                UnitId = unitId,
                UserId = userId,
                Client = Clients.Client(Context.ConnectionId)
            };

        await base.OnConnectedAsync();
    }
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        if (ApplicationHub.ConnectionGroups.TryRemove(Context.ConnectionId, out var clientInfo))
        {
            var log = $"Connection {Context.ConnectionId} was part of group unit {clientInfo.UnitId} - user {clientInfo.UserId}";
            logger.LogInformation(log);
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, clientInfo.UnitId);
        }
        await base.OnDisconnectedAsync(exception);
    }
}