using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Entities.ProductionCommands;
using SI.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.GoodsReceipts;

public class GoodsReceipt : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Nếu là nhập hàng từ lệnh sản xuất thì cần nhập lệnh sản xuất
    // </summary>
    [ForeignKey(nameof(ProductionCommand))]
    public string? ProductionCommandId { get; set; }

    // <summary>
    // Nếu nhập hàng từ nhà cung cấp thì không cần nhập lệnh sản xuất
    // </summary>
    [ForeignKey(nameof(MaterialSupplier))]
    public string? MaterialSupplierId { get; set; }

    // <summary>
    // Người tạo phiếu nhập hàng
    // </summary>
    [ForeignKey(nameof(User))]
    public string UserId { get; set; } = null!;

    [ForeignKey(nameof(Warehouse))]
    public string WarehouseId { get; set; } = null!;

    // <summary>
    // Mã phiếu nhập hàng
    // </summary>
    [StringLength(512)]
    public string Code { get; set; } = null!;

    // <summary>
    // Tên người giao hàng
    // </summary>
    [StringLength(512)]
    public string ShipperName { get; set; } = null!;

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

    public virtual ProductionCommand? ProductionCommand { get; set; }
    public virtual MaterialSupplier? MaterialSupplier { get; set; }
    public virtual User? User { get; set; }
    public virtual Warehouse? Warehouse { get; set; }
    public virtual ICollection<GoodsReceiptDetail>? GoodsReceiptDetail { get; set; }
}
