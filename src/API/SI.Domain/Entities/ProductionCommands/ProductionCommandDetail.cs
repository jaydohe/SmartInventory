using CTCore.DynamicQuery.Core.Domain;
using SI.Domain.Common.Abstractions;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.ProductionCommands;

public class ProductionCommandDetail : CTBaseEntity, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(ProductionCommand))]
    public string ProductionCommandId { get; set; } = null!;

    [ForeignKey(nameof(Product))]
    public string ProductId { get; set; } = null!;

    // <summary>
    // Số lượng sản xuất
    // </summary>
    public int Quantity { get; set; }

    // <summary>
    // Giá sản phẩm
    // </summary>
    public decimal Price { get; set; }

    // <summary>
    // Tổng tiền sản phẩm : Số lượng * giá
    // </summary>
    public decimal TotalPrice { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual ProductionCommand? ProductionCommand { get; set; }
    public virtual Product? Product { get; set; }
}
