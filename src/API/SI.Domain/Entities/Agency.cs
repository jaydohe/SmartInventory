using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Common.Utils;
using SI.Domain.Enums;
using SI.Domain.Events;
using System.ComponentModel.DataAnnotations;

namespace SI.Domain.Entities;

public class Agency : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Mã đại lý
    // </summary>
    [StringLength(100)]
    public string Code { get; set; } = null!;

    // <summary>
    // Tên đại lý
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
    // Công nợ phải thu
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

    public Agency(string id) : base(id) { }
    public Agency() : base() { }

    public void ActivityCreateAgency(string userName, string userRole, string? wareId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.CREATED,
            $@"{userName} ({userRole}) đã thêm {this.Name} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.AGENCY,
            wareId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityUpdateAgency(string userName, string userRole, string? wareId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.UPDATED,
            $@"{userName} ({userRole}) đã cập nhật {this.Name} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.AGENCY,
            wareId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityDeleteAgency(string userName, string userRole, string? wareId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.DELETED,
            $@"{userName} ({userRole}) đã xóa {this.Name} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.AGENCY,
            wareId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }
}

public class AgencyConfiguration : IEntityTypeConfiguration<Agency>
{
    public void Configure(EntityTypeBuilder<Agency> builder)
    {
        builder.HasIndex(x => x.Code);

        // Seed data
        var agencies = new List<Agency>
        {
            new Agency("law")
            {
                Code = "AGC001",
                Name = "Công ty TNHH ABC",
                Representative = "Tuyến Quý Tuân Nguyen",
                TaxCode = "1234567890",
                PhoneNumber = "5887798511",
                Email = "abc@gmail.com",
                Address = "Hà Nội",
                CurrentDebt = 10000000
            },
            new Agency("sunshine")
            {
                Code = "AGC002",
                Name = "Công ty TNHH XYZ",
                Representative = "Sơn Nhung Ngải Phạm",
                TaxCode = "0987654321",
                PhoneNumber = "4975549838",
                Email = "xyz@gmail.com",
                Address = "Hà Nội",
                CurrentDebt = 20000000
            }
        };
        builder.HasData(agencies);
    }   
}
