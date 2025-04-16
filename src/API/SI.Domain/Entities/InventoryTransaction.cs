using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class InventoryTransaction : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Có thể là GoodsReceiptId, GoodsIssue, OrderId,...
    // </summary>
    public string ReferenceId { get; set; } = null!;

    [ForeignKey(nameof(Product))]
    public string ProductId { get; set; } = null!;

    // <summary>
    // Số lượng nhập + hoặc xuất -
    // </summary>
    public int Quantity { get; set; }

    // <summary>
    // Loại giao dịch
    // </summary>
    public string TransactionType { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Product? Product { get; set; }
}
