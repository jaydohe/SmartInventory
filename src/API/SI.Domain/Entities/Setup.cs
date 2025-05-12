using CTCore.DynamicQuery.Core.Domain;
using SI.Domain.Common.Abstractions;
using System.ComponentModel.DataAnnotations;

namespace SI.Domain.Entities;

public class Setup : CTBaseEntity, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Mức độ dịch vụ %
    // </summary>
    [Range(0, 100)]
    public double ZScore { get; set; }

    // <summary>
    // Ngưỡng tồn kho thấp chung
    // </summary>
    public double MinStockLevel { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

}
