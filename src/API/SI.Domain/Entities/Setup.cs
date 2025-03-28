using CTCore.DynamicQuery.Core.Domain;
using SI.Domain.Common.Abstractions;

namespace SI.Domain.Entities;

public class Setup : CTBaseEntity, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Mức độ dịch vụ
    // </summary>
    public double ZScore { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

}
