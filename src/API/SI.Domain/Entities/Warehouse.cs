using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.ValueObjeSI.Location;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Warehouse : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Nếu có WarehouseId thì là kho tổng
    // </summary>
    [ForeignKey(nameof(MasterWarehouse))]
    public string? WarehouseId { get; set; }

    [ForeignKey(nameof(Manager))]
    public string? ManagerId { get; set; }

    [ForeignKey(nameof(Ward))]
    public string WardId { get; set; } = null!;

    [ForeignKey(nameof(District))]
    public string DistrictId { get; set; } = null!;

    [ForeignKey(nameof(Province))]
    public string ProvinceId { get; set; } = null!;

    [ForeignKey(nameof(Category))]
    public string? CategoryId { get; set; }

    // <summary>
    // Mã kho
    // </summary>
    public string Code { get; set; } = null!;

    // <summary>
    // Tên kho
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    // <summary>
    // Địa chỉ kho
    // </summary>
    [StringLength(1024)]
    public string Address { get; set; } = null!;

    // <summary>
    // Sức chứa
    // </summary>
    public int Capacity { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Warehouse? MasterWarehouse { get; set; }
    public virtual Employee? Manager { get; set; }
    public virtual Ward? Ward { get; set; }
    public virtual District? District { get; set; }
    public virtual Province? Province { get; set; }
    public virtual Category? Category { get; set; }
    public virtual ICollection<Warehouse>? SlaveWarehouses { get; set; }
    public virtual ICollection<Employee>? Employees { get; set; }

    public Warehouse(string id) : base(id) { }
    public Warehouse() : base() { }

}
public class WarehouseConfiguration() : IEntityTypeConfiguration<Warehouse>
{
    public void Configure(EntityTypeBuilder<Warehouse> builder)
    {
        // Configure relationship with Manager (Employee)
        builder.HasOne(w => w.Manager)
               .WithMany()
               .HasForeignKey(w => w.ManagerId)
               .IsRequired(false)  // ManagerId can be null
               .OnDelete(DeleteBehavior.SetNull);

        // Configure relationship with employees
        builder.HasMany(w => w.Employees)
               .WithOne(e => e.Warehouse)
               .HasForeignKey(e => e.WarehouseId)
               .IsRequired(false);

        // Seed data
        var warehouses = new List<Warehouse>
        {
            new Warehouse("choi-da-time")
            {
                CategoryId = "1",
                //ManagerId = "hihihaha",
                Code = "CDT001",
                WardId = "1",
                DistrictId = "1",
                ProvinceId = "1",
                Name = "Jellyjellyjelly",
                Address = "123 ham tu",
                Capacity = 999
            },
            new Warehouse("basket")
            {
                CategoryId = "3",
                WardId = "1",
                DistrictId = "1",
                ProvinceId = "1",
                Code = "BASKET001",
                Name = "Basket",
                Address = "123 ham tu",
                Capacity = 999
            }
        };
        builder.HasData(warehouses);
    }
}