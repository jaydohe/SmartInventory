using CTCore.DynamicQuery.Core.Domain;
using CTCore.DynamicQuery.OData.Core;
using CTCore.DynamicQuery.OData.Definations;
using SI.Domain.Common.Abstractions;

namespace SI.Domain.Entities;

[ODataRouting("command",
    IgnoredActions = [ApiActions.Create, ApiActions.Delete, ApiActions.Update])]
public class HttpCommand : CTBaseEntity, IAuditableEntity
{
    public string Url { get; set; } = null!;
    /// <summary>
    /// json string
    /// </summary>
    public string? Body { get; set; }
    /// <summary>
    /// json string
    /// </summary>
    public string? Response { get; set; }

    public bool IsSuccess { get; set; } = false;

    public string? HttpErrorMessage { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
}