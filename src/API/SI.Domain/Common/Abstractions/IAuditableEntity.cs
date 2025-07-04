namespace SI.Domain.Common.Abstractions;

/// <summary>
/// Represents the marker interface for auditable entities.
/// </summary>
public interface IAuditableEntity
{
    /// <summary>
    /// Gets the created on date and time in UTC format.
    /// </summary>
    DateTimeOffset CreatedAt { get; }
    /// <summary>
    /// Gets the modified on date and time in UTC format.
    /// </summary>
    DateTimeOffset? ModifiedOn { get; }

}