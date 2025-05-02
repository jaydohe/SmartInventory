using Microsoft.AspNetCore.SignalR;
using SI.Common.Domain.Events;
using SI.Domain.Entities;

namespace SI.Domain.Events;

public interface INotificationMonitor : IClientProxy
{
    Task Notif(NotifPayloadEvent arg); 
}

public sealed class SendNotificationEvent(string senderId, bool isSend, params IEnumerable<Notification> payload): IDomainEvent
{
    public bool IsSend = isSend;
    public string SenderId = senderId;
    public IEnumerable<Notification> Payload = payload;
}

/// <param name="Id">TargetId</param>
/// <param name="Type">NotifType</param>
/// <param name="Title">Title</param>
/// <param name="Content">Content</param>
public record NotifPayload(
    string Id,
    string Type,
    string Title,
    string Content
);

/// <summary>
/// Added for event 
/// </summary>
public record NotifPayloadEvent(
    string Id,
    string TargetId,
    string Type,
    string Title,
    string Content
);


public readonly struct NotifType
{
    public const string ORDER = "ORDER";
    public const string FORECAST = "FORECAST";
    public const string GOODSISSUE = "GOODSISSUE";
    public const string GOODSRECEIPT = "GOODSRECEIPT";
    public const string PRODUCTIONCOMMAND = "PRODUCTIONCOMMAND";
}