using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations;

namespace SI.Domain.Entities;

public class Department : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Mã phòng ban
    // </summary>
    [StringLength(100)]
    public string Code { get; set; } = null!;

    // <summary>
    // Tên phòng ban
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual ICollection<Employee>? Employees { get; set; }

    public Department(string id) : base(id) { }
    public Department() : base() { }
}
public class DepartmentConfiguration() : IEntityTypeConfiguration<Department>
{
    public void Configure(EntityTypeBuilder<Department> builder)
    {
        builder.HasIndex(e => e.Code);

        // Seed data
        var departments = new List<Department>
        {
            new Department("huhuhu")
            {
                Code = "DEPART001",
                Name = "Bộ phận quản lý kho"
            },
            new Department("sugar-town")
            {
                Code = "DEPART002",
                Name = "Bộ phận quản lý sản xuất"
            },
            new Department("parrot-smell")
            {
                Code = "DEPART003",
                Name = "Bộ phận quản lý bán hàng"
            }
        };
        builder.HasData(departments);
    }
}
