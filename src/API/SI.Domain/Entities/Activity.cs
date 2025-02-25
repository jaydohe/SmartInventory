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
[Authorize(Policy = APIPolicies.OPERATEFULL)]
public class Activity : CTBaseEntity
{
    public ActivityContentTypes ContentType { get; set; }

    [StringLength(1024)]
    public string Content { get; set; } = string.Empty; 

    public string TargetId { get; set; } = null!;

    public string? UnitId { get; set; }

    public string EntityType { get; set; } = ActivityEntityTypes.USER;

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
            UnitId = payLoad.UnitId
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
