using CTCore.DynamicQuery.Core.Domain;
using SI.Domain.Common.Abstractions;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.GoodsReceipts;

public class GoodsReceiptDetail : CTBaseEntity, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(GoodsReceipt))]
    public string GoodsReceiptId { get; set; } = null!;

    [ForeignKey(nameof(Product))]
    public string ProductId { get; set; } = null!;

    // <summary>
    // Số lượng đặt hàng
    // </summary>
    public int QuantityOrdered { get; set; }

    // <summary>
    // Số lượng nhận
    // </summary>
    public int QuantityReceived { get; set; }

    // <summary>
    // Tổng tiền sản phẩm : Số lượng * giá
    // </summary>
    public decimal TotalPrice { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual GoodsReceipt? GoodsReceipt { get; set; }
    public virtual Product? Product { get; set; }
}
