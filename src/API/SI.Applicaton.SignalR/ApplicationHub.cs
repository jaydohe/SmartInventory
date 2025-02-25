using System.Collections.Concurrent;
using Microsoft.Extensions.DependencyInjection;
using SI.Application.SignalR.Hubs;
using SI.Application.SignalR.Types;

namespace SI.Application.SignalR;

public static class ApplicationHub
{
    /// <summary>
    /// connectionId, groupName
    /// </summary>
    public static readonly ConcurrentDictionary<string, ClientInfo> ConnectionGroups = new();

    public static void AddApplicationHub(this IServiceCollection services)
    {
        services.AddSignalR();
        services.AddScoped<MonitorHub>();
    }
}
