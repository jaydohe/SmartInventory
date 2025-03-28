using CTCore.DynamicQuery.Core.Domain;
using SI.Domain.Common.Abstractions;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.Orders;

public class OrderDetail : CTBaseEntity, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Order))]
    public string OrderId { get; set; } = null!;

    [ForeignKey(nameof(Product))]
    public string ProductId { get; set; } = null!;

    // <summary>
    // Số lượng sản phẩm
    // </summary>
    public int Quantity { get; set; }

    // <summary>
    // Giá sản phẩm tại thời điểm đặt hàng
    // </summary>
    public decimal UnitPrice { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Order? Order { get; set; }
    public virtual Product? Product { get; set; }
}
