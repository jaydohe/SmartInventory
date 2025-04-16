using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Enums;
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

    [ForeignKey(nameof(Position))]
    public string? PositionId { get; set; }

    // <summary>
    // Mã nhân viên
    // </summary>
    [StringLength(100)]
    public string Code { get; set; } = null!;

    // <summary>
    // Tên nhân viên
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    // <summary>
    // Giới tính
    // </summary>
    public string GenderType { get; set; } = string.Empty;

    public bool? IsManager { get; set; }

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
    public virtual Position? Position { get; set; }

    public Employee(string id) : base(id) { }
    public Employee() : base() { }
}
public class EmployeeConfiguration : IEntityTypeConfiguration<Employee>
{
    public void Configure(EntityTypeBuilder<Employee> builder)
    {
        builder.HasIndex(e => e.Code);

        // Seed data
        var employees = new List<Employee>
        {
            // Giám đốc
            new Employee("bonk")
            {
                WardId = "1",
                DistrictId = "1",
                ProvinceId = "1",
                PositionId = "1",
                Code = "ADMIN01",
                Name = "Nguyễn Văn C",
                GenderType = GenderTypes.FEMALE,
                PhoneNumber = "7894561230",
                Email = "VanC@gmail.com",
                Address = "Hà Nội",
                DateHired = DateTime.Now
            },
            // Quản lý kho
            new Employee("hihihaha")
            {
                DepartmentId = "huhuhu",
                WardId = "1",
                DistrictId = "1",
                ProvinceId = "1",
                PositionId = "4",
                Code = "MANAGER01",
                Name = "Nguyễn Văn A",
                GenderType = GenderTypes.OTHER,
                IsManager = true,
                PhoneNumber = "0123456789",
                Email = "VanA@gmail.com",
                Address = "Hà Nội",
                DateHired = DateTime.Now,
                WarehouseId = "choi-da-time"
            },
            // Nhân viên kho
            new Employee("hihihaharamram")
            {
                DepartmentId = "huhuhu",
                WardId = "1",
                DistrictId = "1",
                ProvinceId = "1",
                PositionId = "5",
                Code = "EMPLOYEE01",
                Name = "Nguyễn Văn B",
                GenderType = GenderTypes.MALE,
                IsManager = false,
                PhoneNumber = "0123456987",
                Email = "VanB@gmail.com",
                Address = "Hà Nội",
                DateHired = DateTime.Now,
                WarehouseId = "choi-da-time"
            },
            // Quản lý sản xuất
            new Employee("bankmiramram")
            {
                DepartmentId = "sugar-town",
                WardId = "1",
                DistrictId = "1",
                ProvinceId = "1",
                PositionId = "6",
                Code = "EMPLOYEE02",
                Name = "Nguyễn Văn D",
                GenderType = GenderTypes.OTHER,
                IsManager = true,
                PhoneNumber = "0123457953",
                Email = "VanD@gmail.com",
                Address = "Hà Nội",
                DateHired = DateTime.Now,
                WarehouseId = "choi-da-time"
            },
            // Nhân viên bán hàng
            new Employee("dainam")
            {
                DepartmentId = "parrot-smell",
                WardId = "1",
                DistrictId = "1",
                ProvinceId = "1",
                PositionId = "7",
                Code = "EMPLOYEE03",
                Name = "Nguyễn Văn E",
                GenderType = GenderTypes.MALE,
                IsManager = false,
                PhoneNumber = "012548756",
                Email = "VanE@gmail.com",
                Address = "Hà Nội",
                DateHired = DateTime.Now
            }
        };
        builder.HasData(employees);
    }
}