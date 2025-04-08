using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.BOM;

public class BillOfMaterialDetail : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(BillOfMaterial))]
    public string BillOfMaterialId { get; set; } = null!;

    // <summary>
    // Nguyên vật liệu
    // </summary>
    [ForeignKey(nameof(Material))]
    public string MaterialId { get; set; } = null!;

    // <summary>
    // Số lượng nguyên vật liệu
    // </summary>
    public int Quantity { get; set; }

    // <summary>
    // Đơn vị tính
    // </summary>
    [StringLength(512)]
    public string Unit { get; set; } = null!;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual BillOfMaterial? BillOfMaterial { get; set; }
    public virtual Product? Material { get; set; }
}