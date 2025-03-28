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

    [ForeignKey(nameof(Employee))]
    public string? EmployeeId { get; set; }

    [ForeignKey(nameof(Ward))]
    public string WardId { get; set; } = null!;

    [ForeignKey(nameof(District))]
    public string DistrictId { get; set; } = null!;

    [ForeignKey(nameof(Province))]
    public string ProvinceId { get; set; } = null!;

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
    public virtual Employee? Employee { get; set; }
    public virtual Ward? Ward { get; set; }
    public virtual District? District { get; set; }
    public virtual Province? Province { get; set; }
    public virtual ICollection<Warehouse>? SlaveWarehouses { get; set; }
    public virtual ICollection<User>? Users { get; set; }
}
