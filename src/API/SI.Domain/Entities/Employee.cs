using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.ValueObjeSI.Location;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Employee : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Mã phòng ban (admin không cần)
    // </summary>
    [ForeignKey(nameof(Department))]
    public string? DepartmentId { get; set; }

    [ForeignKey(nameof(Ward))]
    public string WardId { get; set; } = null!;

    [ForeignKey(nameof(District))]
    public string DistrictId { get; set; } = null!;

    [ForeignKey(nameof(Province))]
    public string ProvinceId { get; set; } = null!;

    [ForeignKey(nameof(Warehouse))]
    public string? WarehouseId { get; set; }

    // <summary>
    // Tên nhân viên
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    // <summary>
    // Giới tính true = 1 = nam, false = 0 = nữ
    // </summary>
    public bool IsMale { get; set; } = true;

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
    // Chức vụ
    // </summary>
    [StringLength(512)]
    public string Position { get; set; } = null!;

    // <summary>
    // Ngày vào làm
    // </summary>
    public DateTime DateHired { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Department? Department { get; set; }
    public virtual Ward? Ward { get; set; }
    public virtual District? District { get; set; }
    public virtual Province? Province { get; set; }
    public virtual Warehouse? Warehouse { get; set; }

    public Employee(string id) : base(id) { }
    public Employee() : base() { }
}
public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        var admin1 = new Employee("bonk")
        {
            WardId = "1",
            DistrictId = "1",
            ProvinceId = "1",
            Name = "Nguyễn Văn C",
            IsMale = true,
            PhoneNumber = "7894561230",
            Email = "VanC@gmail.com",
            Address = "Hà Nội",
            Position = "Giám đốc công ty",
            DateHired = DateTime.Now
        };
        var manager2 = new Employee("hihihaha")
        {
            DepartmentId = "huhuhu",
            WardId = "1",
            DistrictId = "1",
            ProvinceId = "1",
            Name = "Nguyễn Văn A",
            IsMale = true,
            PhoneNumber = "0123456789",
            Email = "VanA@gmail.com",
            Address = "Hà Nội",
            Position = "Quản lý kho",
            DateHired = DateTime.Now,
            WarehouseId = "choi-da-time"
        };
        var employee3 = new Employee("hihihaharamram")
        {
            DepartmentId = "huhuhu",
            WardId = "1",
            DistrictId = "1",
            ProvinceId = "1",
            Name = "Nguyễn Văn B",
            IsMale = true,
            PhoneNumber = "0123456987",
            Email = "VanB@gmail.com",
            Address = "Hà Nội",
            Position = "Nhân viên kho",
            DateHired = DateTime.Now,
            WarehouseId = "choi-da-time"
        };
        var employee4 = new Employee("bankmiramram")
        {
            DepartmentId = "sugar-town",
            WardId = "1",
            DistrictId = "1",
            ProvinceId = "1",
            Name = "Nguyễn Văn D",
            IsMale = true,
            PhoneNumber = "0123457953",
            Email = "VanD@gmail.com",
            Address = "Hà Nội",
            Position = "Quản lý sản xuất",
            DateHired = DateTime.Now,
            WarehouseId = "choi-da-time"
        };
        var employee5 = new Employee("dainam")
        {
            DepartmentId = "parrot-smell",
            WardId = "1",
            DistrictId = "1",
            ProvinceId = "1",
            Name = "Nguyễn Văn E",
            IsMale = true,
            PhoneNumber = "012548756",
            Email = "VanE@gmail.com",
            Address = "Hà Nội",
            Position = "Nhân viên bán hàng",
            DateHired = DateTime.Now
        };
        builder.HasData([admin1, manager2, employee3, employee4, employee5]);
    }
}
