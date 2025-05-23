using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Common.Utils;
using SI.Domain.Events;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Inventory : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Product))]
    public string ProductId { get; set; } = null!;

    [ForeignKey(nameof(Warehouse))]
    public string WarehouseId { get; set; } = null!;

    // <summary>
    // Số lượng tồn kho
    // </summary>
    public int Quantity { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Product? Product { get; set; }
    public virtual Warehouse? Warehouse { get; set; }

    public void SendNotifLowInventory(string productName, string wareName, params string[] userIds)
    {
        var payload = new NotifPayload(
            this.Id,
            NotifType.FORECAST,
            "Tồn kho thấp",
            $"Sản phẩm {productName} tại kho {wareName} đã thấp hơn mức tối thiểu vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}"
        );
        this.Raise(new SendNotificationEvent("Dự báo", true, Notification.Create(payload, userIds)));
    }
}