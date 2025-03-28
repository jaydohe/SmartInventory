using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Department : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Warehouse))]
    public string? WarehouseId { get; set; }

    // <summary>
    // Tên phòng ban
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Warehouse? Warehouse { get; set; }
    public virtual ICollection<Employee>? Employees { get; set; }
    public virtual ICollection<User>? Users { get; set; }
}
