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

    public TransactionTypes Type { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Product? Product { get; set; }
}
