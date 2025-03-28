using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.ProductionCommands;

public class ProductionCommandProcess : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(ProductionCommands))]
    public string ProductionCommandId { get; set; } = null!;

    // <summary>
    // Tiến trình sản xuất
    // </summary>
    public double Percentage { get; set; } = 0;

    // <summary>
    // Ghi chú
    // </summary>
    [StringLength(1024)]
    public string? Note { get; set; }

    public ProcessProductionStatus Status { get; set; } = ProcessProductionStatus.PREPARATION;

    // <summary>
    // Ngày bắt đầu thực tế
    // </summary>
    public DateTimeOffset? ActualStart { get; set; }

    // <summary>
    // Ngày kết thúc thực tế
    // </summary>
    public DateTimeOffset? ActualEnd { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual ProductionCommand? ProductionCommands { get; set; }
}