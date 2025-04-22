using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Inventory : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Product))]
    public string ProductId { get; set; } = null!;

    [ForeignKey(nameof(Warehouse))]
    public string WarehouseId { get; set; } = null!;

    // <summary>
    // Số lượng tồn kho
    // </summary>
    public int Quantity { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Product? Product { get; set; }
    public virtual Warehouse? Warehouse { get; set; }
}