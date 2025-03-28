using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.GoodsIssues;

public class GoodsIssue : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Người tạo phiếu xuất hàng
    // </summary>
    [ForeignKey(nameof(User))]
    public string UserId { get; set; } = null!;

    [ForeignKey(nameof(Warehouse))]
    public string WarehouseId { get; set; } = null!;

    // <summary>
    // Đại lý nhận hàng
    // </summary>
    [ForeignKey(nameof(Agency))]
    public string AgencyId { get; set; } = null!;

    // <summary>
    // Mã phiếu xuất hàng
    // </summary>
    [StringLength(512)]
    public string Code { get; set; } = null!;

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
    // Ghi chú
    // </summary>
    [StringLength(1024)]
    public string? Note { get; set; }

    public GoodsStatus Status { get; set; } = GoodsStatus.CREATED;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual User? User { get; set; }
    public virtual Warehouse? Warehouse { get; set; }
    public virtual Agency? Agency { get; set; }
    public virtual ICollection<GoodsIssueDetail>? GoodsIssueDetails { get; set; }
}
