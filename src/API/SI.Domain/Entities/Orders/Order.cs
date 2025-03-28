using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.Orders;

public class Order : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Agency))]
    public string AgencyId { get; set; } = null!;

    // <summary>
    // Tổng số tiền của đơn hàng
    // </summary>
    public decimal TotalAmount { get; set; }

    public OrderStatus OrderStatus { get; set; } = OrderStatus.INPROCESS;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Agency? Agency { get; set; }
    public virtual ICollection<OrderDetail>? OrderDetails { get; set; }
}
