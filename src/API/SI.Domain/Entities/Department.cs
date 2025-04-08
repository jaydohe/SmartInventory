using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations;

namespace SI.Domain.Entities;

public class Department : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
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
        var newDepartment1 = new Department("huhuhu")
        {
            Name = "Bộ phận quản lý kho"
        };
        builder.HasData(newDepartment1);
    }
}
