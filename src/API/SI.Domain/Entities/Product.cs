using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Product : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Nếu có MaterialSupplierId thì là sản phẩm nhập từ nhà cung cấp
    // </summary>
    [ForeignKey(nameof(MaterialSupplier))]
    public string? MaterialSupplierId { get; set; }

    // <summary>
    // Tên sản phẩm
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    // <summary>
    // Mã sản phẩm
    // </summary>
    [StringLength(512)]
    public string Code { get; set; } = null!;

    // <summary>
    // Mô tả sản phẩm
    // </summary>
    [StringLength(1024)]
    public string Description { get; set; } = null!;

    // <summary>
    // Đơn vị tính
    // </summary>
    [StringLength(512)]
    public string Unit { get; set; } = null!;

    // <summary>
    // Giá sản phẩm
    // </summary>
    public decimal Price { get; set; }

    // <summary>
    // Chi phí sản xuất / Giá nhập hàng
    // </summary>
    public decimal ProductionCost { get; set; }

    // <summary>
    // Chi phí lưu kho
    // </summary>
    public decimal HoldingCost { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual MaterialSupplier? MaterialSupplier { get; set; }
}