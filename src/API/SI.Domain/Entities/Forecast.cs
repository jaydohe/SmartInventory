using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Forecast : AggregateRoot
{
    [ForeignKey(nameof(Product))]
    public string? ProductId { get; set; }

    // <summary>
    // Số lượng dự báo
    // </summary>
    public int Quantity { get; set; }

    // <summary>
    // Phương pháp dự báo
    // </summary>
    [StringLength(512)]
    public string Method { get; set; } = null!;

    // <summary>
    // Kỳ dự báo
    // </summary>
    [StringLength(1024)]
    public string Period { get; set; } = null!;

    // <summary>
    // Số lượng đặt hàng kinh tế
    // </summary>
    public double EOQ { get; set; }

    // <summary>
    // Mức hàng tồn kho an toàn
    // </summary>
    public double SafetyStock { get; set; }

    // <summary>
    // Tồn kho tối ưu (EOQ + SafetyStock)
    // </summary>
    public double OptimalInventory { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public virtual Product? Product { get; set; }
}
