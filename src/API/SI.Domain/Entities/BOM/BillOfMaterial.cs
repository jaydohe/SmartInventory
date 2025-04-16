using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.BOM;

public class BillOfMaterial : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Mặt hàng sản xuất
    // </summary>
    [ForeignKey(nameof(Product))]
    public string ProductId { get; set; } = null!;

    // <summary>
    // Mã định mức
    // </summary>
    [StringLength(512)]
    public string Code { get; set; } = null!;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Product? Product { get; set; }
    public virtual ICollection<BillOfMaterialDetail>? BillOfMaterialDetails { get; set; }
}

public class BillOfMaterialConfiguration : IEntityTypeConfiguration<BillOfMaterial>
{
    public void Configure(EntityTypeBuilder<BillOfMaterial> builder)
    {
        builder.HasIndex(x => x.Code);
    }
}
