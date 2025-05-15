using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Common.Utils;
using SI.Domain.Entities.Orders;
using SI.Domain.Enums;
using SI.Domain.Events;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.ProductionCommands;

public class ProductionCommand : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Id của đơn hàng liên quan nếu có
    // </summary>
    [ForeignKey(nameof(Order))]
    public string? OrderId { get; set; }

    // <summary>
    // Người tạo lệnh sản xuất
    // </summary>
    [ForeignKey(nameof(User))]
    public string UserId { get; set; } = null!;

    // <summary>
    // Mã lệnh sản xuất
    // </summary>
    [StringLength(512)]
    public string Code { get; set; } = null!;

    // <summary>
    // Tổng tiền
    // </summary>
    public decimal TotalAmount { get; set; }

    // <summary>
    // Mô tả
    // </summary>
    [StringLength(1024)]
    public string? Description { get; set; }

    public CommandStatus Status { get; set; } = CommandStatus.CREATED;

    // <summary>
    // Ngày dự kiến bắt đầu sản xuất
    // </summary>
    public DateTimeOffset? PlannedStart { get; set; }

    // <summary>
    // Ngày dự kiến kết thúc sản xuất
    // </summary>
    public DateTimeOffset? PlannedEnd { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Order? Order { get; set; }
    public virtual User? User { get; set; }
    public virtual ICollection<ProductionCommandDetail>? Details { get; set; }
    public virtual ICollection<ProductionCommandProcess>? Processes { get; set; }
}

public class ProductionCommandConfiguration : IEntityTypeConfiguration<ProductionCommand>
{
    public void Configure(EntityTypeBuilder<ProductionCommand> builder)
    {
        builder.HasIndex(x => x.Code);
    }
}
