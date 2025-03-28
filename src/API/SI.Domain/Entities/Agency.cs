using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.ValueObjeSI.Location;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Agency : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Ward))]
    public string WardId { get; set; } = null!;

    [ForeignKey(nameof(District))]
    public string DistrictId { get; set; } = null!;

    [ForeignKey(nameof(Province))]
    public string ProvinceId { get; set; } = null!;

    // <summary>
    // Tên đại lý
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    // <summary>
    // Số điện thoại
    // </summary>
    [StringLength(20)]
    public string PhoneNumber { get; set; } = null!;

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
    // Mã số thuế
    // </summary>
    [StringLength(100)]
    public string TaxCode { get; set; } = null!;

    // <summary>
    // Công nợ hiện tại
    // </summary>
    public decimal? CurrentDebt { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Ward? Ward { get; set; }
    public virtual District? District { get; set; }
    public virtual Province? Province { get; set; }
}
