using Microsoft.AspNetCore.SignalR;

namespace SI.Application.SignalR.Types;
public class ClientInfo
{
    public required string UnitId { get; set; }
    public required string UserId { get; set; }
    // public HubCallerContext Context { get; set; } = null!;
    public IClientProxy Client { get; set; } = null!;
}