using SI.Common.Domain.Events;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Domain.Events;

public sealed class WriteActivityEvent(params IEnumerable<Activity> payload): IDomainEvent
{
    public IEnumerable<Activity> Payload = payload;
}

/// <param name="Name">TargetId</param>
/// <param name="ContentType">ContentType</param>
/// <param name="Content">Content</param>
/// <param name="EntityType">EntityType</param>
/// <!-- WarehouseId is optional -->-->
/// <!-- DepartmentId is optional -->-->
public record WriteActiPayLoad(
    string Name,
    ActivityContentTypes ContentType,
    string Content,
    string EntityType,
    string? WarehouseId,
    string? DepartmentId
);
