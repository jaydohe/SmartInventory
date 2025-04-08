using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.BOM;

public class BillOfMaterial : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Mặt hàng sản xuất
    // </summary>
    [ForeignKey(nameof(Product))]
    public string ProductId { get; set; } = null!;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Product? Product { get; set; }
    public virtual ICollection<BillOfMaterialDetail>? BillOfMaterialDetails { get; set; }
}
