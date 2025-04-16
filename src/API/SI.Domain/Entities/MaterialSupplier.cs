using CTCore.DynamicQuery.Core.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.ValueObjeSI.Location;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class MaterialSupplier : CTBaseEntity, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Ward))]
    public string WardId { get; set; } = null!;

    [ForeignKey(nameof(District))]
    public string DistrictId { get; set; } = null!;

    [ForeignKey(nameof(Province))]
    public string ProvinceId { get; set; } = null!;

    // <summary>
    // Mã nhà cung cấp vật liệu
    // </summary>
    [StringLength(100)]
    public string Code { get; set; } = null!;

    // <summary>
    // Tên nhà cung cấp vật liệu
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    // <summary>
    // Nguời đại diện
    // </summary>
    [StringLength(512)]
    public string Representative { get; set; } = null!;

    // <summary>
    // Mã số thuế
    // </summary>
    [StringLength(100)]
    public string? TaxCode { get; set; }

    // <summary>
    // Số điện thoại
    // </summary>
    [StringLength(20)]
    public string PhoneNumber { get; set; } = null!;

    // <summary>
    // Mặt hàng kinh doanh
    // </summary>
    [StringLength(1024)]
    public string BusinessItem { get; set; } = null!;

    // <summary>
    // Email
    // </summary>
    [StringLength(512)]
    public string Email { get; set; } = null!;

    // <summary>
    // Địa chỉ
    // </summary>
    [StringLength(1024)]
    public string Address { get; set; } = null!;    

    // <summary>
    // Công nợ phải trả
    // </summary>
    public decimal? CurrentDebt { get; set; }

    // <summary>
    // Ghi chú
    // </summary>
    [StringLength(1024)]
    public string? Note { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Ward? Ward { get; set; }
    public virtual District? District { get; set; }
    public virtual Province? Province { get; set; }

    public MaterialSupplier(string id) : base(id) { }
    public MaterialSupplier() : base() { }
}

public class MaterialSupplierConfiguration : IEntityTypeConfiguration<MaterialSupplier>
{
    public void Configure(EntityTypeBuilder<MaterialSupplier> builder)
    {
        builder.HasIndex(e => e.Code);

        // Seed data
        var suppliers = new List<MaterialSupplier>
        {
            new MaterialSupplier("bare")
            {
                WardId = "1",
                DistrictId = "1",
                ProvinceId = "1",
                Code = "SUPPLIER001",
                Name = "Nhà cung cấp 1",
                Representative = "Nguyễn Văn A",
                TaxCode = "123456789",
                PhoneNumber = "0123456789",
                BusinessItem = "Vật liệu xây dựng",
                Email = "A@gmail.com",
                Address = "Hà Nội",
                CurrentDebt = 0
            },
            new MaterialSupplier("cower")
            {
                WardId = "1",
                DistrictId = "1",
                ProvinceId = "1",
                Code = "SUPPLIER002",
                Name = "Nhà cung cấp 2",
                Representative = "Nguyễn Văn B",
                TaxCode = "8877955549",
                PhoneNumber = "0987654321",
                BusinessItem = "Vật liệu điện",
                Email = "B@gmail.com",
                Address = "Hà Nội",
                CurrentDebt = 0
            }
        };
        builder.HasData(suppliers);
    }
}
