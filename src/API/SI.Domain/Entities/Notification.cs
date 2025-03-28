using System.ComponentModel.DataAnnotations;
using CTCore.DynamicQuery.Core.Domain;
using CTCore.DynamicQuery.OData.Core;
using CTCore.DynamicQuery.OData.Definations;
using Microsoft.AspNetCore.Authorization;
using SI.Domain.Events;

namespace SI.Domain.Entities;

[ODataRouting(nameof(Notification), 
    RouteRefix = "private-api",
    IgnoredActions = [ApiActions.Create])]
[Authorize]
public class Notification : CTBaseEntity
{
    // <summary>
    // Id của đối tượng được gửi thông báo
    // </summary>
    public string UserId { get; set; } = null!;

    // <summary>
    // Id của thực thể sẽ gửi thông báo
    // </summary>
    public string TargetId { get; set; } = null!;

    // <summary>
    // Thể loại thông báo
    // </summary>
    public string Type {get;set;}  = null!;

    // <summary>
    // Nội dung thông báo
    // </summary>
    [StringLength(2048)]
    public string Content {get;set;} = string.Empty;

    // <summary>
    // Tiêu đề thông báo
    // </summary>
    [StringLength(512)]
    public string Title {get;set;}  = string.Empty;

    // <summary>
    // Đánh dấu thông báo đã đọc
    // </summary>
    public bool IsMarked { get; set; }  = false;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;


    public static IEnumerable<Notification> Create(
        NotifPayload payload, params string[] userIds){
        foreach(var userId in userIds) {
            yield return new Notification { 
                UserId      = userId,
                TargetId    = payload.Id,
                Type        = payload.Type,
                Content     = payload.Content,
                Title       = payload.Title
            };
        }
    }
    
    public NotifPayloadEvent ParseToNotiPayload(){
        return new NotifPayloadEvent(Id, TargetId, Type, Title, Content);
    }
}
