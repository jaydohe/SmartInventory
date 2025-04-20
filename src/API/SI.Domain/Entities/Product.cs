using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Product : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Nếu có MaterialSupplierId thì là sản phẩm nhập từ nhà cung cấp nguyên vật liệu
    // </summary>
    [ForeignKey(nameof(MaterialSupplier))]
    public string? MaterialSupplierId { get; set; }

    [ForeignKey(nameof(Category))]
    public string CategoryId { get; set; } = null!;

    // <summary>
    // Mã sản phẩm
    // </summary>
    public string Code { get; set; } = null!;

    // <summary>
    // Tên sản phẩm
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

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
    // Loại sản phẩm
    // </summary>
    public string ProductType { get; set; } = string.Empty;

    // <summary>
    // Giá mua
    // </summary>
    public decimal PurchasePrice { get; set; }

    // <summary>
    // Giá bán
    // </summary>
    public decimal SellingPrice { get; set; }

    // <summary>
    // Chi phí lưu kho
    // </summary>
    public decimal HoldingCost { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual MaterialSupplier? MaterialSupplier { get; set; }
    public virtual Category? Category { get; set; }

    public Product(string id) : base(id) { }
    public Product() : base() { }
}

public class ProductConfiguration : IEntityTypeConfiguration<Product>
{
    public void Configure(EntityTypeBuilder<Product> builder)
    {
        builder.HasIndex(e => e.Code);

        // Seed data
        var products = new List<Product>
        {
            new Product("1")
            {
                CategoryId = "2",
                Code = "PROD001",
                Name = "Sản phẩm 1",
                Description = "Mô tả sản phẩm 1",
                Unit = "Cái",
                ProductType = ProductTypes.FINISHED_PRODUCT,
                PurchasePrice = 1000,
                SellingPrice = 1200,
                HoldingCost = 50
            },
            new Product("2")
            {
                CategoryId = "2",
                MaterialSupplierId = "bare",
                Code = "PROD002",
                Name = "Sản phẩm 2",
                Description = "Mô tả sản phẩm 2",
                Unit = "Cái",
                ProductType = ProductTypes.RAW_MATERIAL,
                PurchasePrice = 2000,
                SellingPrice = 2500,
                HoldingCost = 100
            }
        };
        builder.HasData(products);
    }
}