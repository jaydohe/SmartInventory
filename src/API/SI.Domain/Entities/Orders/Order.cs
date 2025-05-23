using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Common.Utils;
using SI.Domain.Enums;
using SI.Domain.Events;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.Orders;

public class Order : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Agency))]
    public string AgencyId { get; set; } = null!;

    [ForeignKey(nameof(Warehouse))]
    public string? WarehouseId { get; set; }

    // <summary>
    // Mã đơn hàng
    // </summary>
    [StringLength(512)]
    public string Code { get; set; } = null!;

    // <summary>
    // Nguời tạo đơn hàng
    // </summary>
    [ForeignKey(nameof(User))]
    public string UserId { get; set; } = null!;

    // <summary>
    // Phần trăm thuế (10%)
    // </summary>
    [Range(0, 100)]
    public decimal? VAT { get; set; }

    // <summary>
    // Phần trăm chiết khấu (10%)
    // </summary>
    [Range(0, 100)]
    public decimal? Discount { get; set; }

    // <summary>
    // Tổng số tiền của đơn hàng
    // </summary>
    public decimal TotalAmount { get; set; }

    public bool IsRefund { get; set; } = false;

    public OrderStatus OrderStatus { get; set; } = OrderStatus.NEW;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual User? User { get; set; }
    public virtual Agency? Agency { get; set; }
    public virtual Warehouse? Warehouse { get; set; }
    public virtual ICollection<OrderDetail>? OrderDetails { get; set; }

    public void SendNotifRequestProductionCommand(string userId, string code, params string[] userIds)
    {
        var payload = new NotifPayload(
            Guid.CreateVersion7().ToString(),
            NotifType.PRODUCTIONCOMMAND,
            $"Yêu cầu lệnh sản xuất",
            $@"{userId} đã yêu cầu lệnh sản xuất từ đơn hàng {code} vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}"
        );
        this.Raise(new SendNotificationEvent(userId, true, Notification.Create(payload, userIds)));
    }

}

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder.HasIndex(x => x.Code);
    }
}