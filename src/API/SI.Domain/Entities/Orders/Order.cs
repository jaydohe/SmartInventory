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

    // <summary>
    // Mã đơn hàng
    // </summary>
    [StringLength(512)]
    public string Code { get; set; } = null!;

    // <summary>
    // Tổng số tiền của đơn hàng
    // </summary>
    public decimal TotalAmount { get; set; }

    public bool IsRefund { get; set; } = false;

    public OrderStatus OrderStatus { get; set; } = OrderStatus.NEW;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Agency? Agency { get; set; }
    public virtual ICollection<OrderDetail>? OrderDetails { get; set; }

    public void SendNotifRequestProductionCommand(string userId, params string[] userIds)
    {
        var payload = new NotifPayload(
            Guid.CreateVersion7().ToString(),
            NotifType.PRODUCTIONCOMMAND,
            $"Yêu cầu lệnh sản xuất",
            $@"{userId} đã yêu cầu lệnh sản xuất vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}"
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