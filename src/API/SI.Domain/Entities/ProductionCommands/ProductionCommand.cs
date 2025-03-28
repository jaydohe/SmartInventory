using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.ProductionCommands;

public class ProductionCommand : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Agency))]
    public string AgencyId { get; set; } = null!;

    // <summary>
    // Người tạo lệnh sản xuất
    // </summary>
    [ForeignKey(nameof(User))]
    public string UserId { get; set; } = null!;

    // <summary>
    // Tổng tiền
    // </summary>
    public decimal TotalAmount { get; set; }

    // <summary>
    // Tổng tiền bằng chữ
    // </summary>
    [StringLength(1024)]
    public string TotalToText { get; set; } = null!;

    // <summary>
    // Mô tả
    // </summary>
    [StringLength(1024)]
    public string? Description { get; set; }

    public CommandStatus Status { get; set; } = CommandStatus.CREATED;

    // <summary>
    // Ngày dự kiến bắt đầu sản xuất
    // </summary>
    public DateTimeOffset? PlannedStart { get; set; }

    // <summary>
    // Ngày dự kiến kết thúc sản xuất
    // </summary>
    public DateTimeOffset? PlannedEnd { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Agency? Agency { get; set; }
    public virtual User? User { get; set; }
    public virtual ICollection<ProductionCommandDetail>? ProductionCommandDetail { get; set; }
}
