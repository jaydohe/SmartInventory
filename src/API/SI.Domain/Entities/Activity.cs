using System.ComponentModel.DataAnnotations;
using CTCore.DynamicQuery.Core.Domain;
using CTCore.DynamicQuery.OData.Core;
using CTCore.DynamicQuery.OData.Definations;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Enums;
using SI.Domain.Events;

namespace SI.Domain.Entities;

[ODataRouting(nameof(Activity), RouteRefix = "private-api",
    IgnoredActions = [ApiActions.Create, ApiActions.Delete, ApiActions.Update])]
[Authorize(Policy = APIPolicies.ADMIN)]
public class Activity : CTBaseEntity
{
    // <summary>
    // Nội dung đã thao tác
    // </summary>
    [StringLength(1024)]
    public string Content { get; set; } = string.Empty;

    // <summary>
    // Tên của đối tượng đã thao tác
    // </summary>
    public string TargetId { get; set; } = null!;

    // <summary>
    // Id kho của người đã thao tác
    // </summary>
    public string? WarehouseId { get; set; }

    // <summary>
    // Id phòng ban của người đã thao tác
    // </summary>
    public string? DepartmentId { get; set; }

    // <summary>
    // Thực thể đã thao tác
    // </summary>
    public string EntityType { get; set; } = string.Empty;

    public ActivityContentTypes ContentType { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public static IEnumerable<Activity> Create(
        WriteActiPayLoad payLoad)
    {
        yield return new Activity
        {
            TargetId = payLoad.Name,
            ContentType = payLoad.ContentType,
            Content = payLoad.Content,
            EntityType = payLoad.EntityType,
            WarehouseId = payLoad.WarehouseId
        };
    }
}

public class ActivityConfiguration : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.HasIndex(e => e.TargetId);
    }
}
