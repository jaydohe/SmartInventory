using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Forecast : AggregateRoot
{
    [ForeignKey(nameof(Product))]
    public string? ProductId { get; set; }

    [ForeignKey(nameof(Warehouse))]
    public string WarehouseId { get; set; } = null!;

    /// <summary>
    /// Giá trị dự báo (forecasted quantity)
    /// </summary>
    public double? ForecastValue { get; set; }

    /// <summary>
    /// Phương pháp dự báo (ví dụ "HW-Additive", "HW-Multiplicative")
    /// </summary>
    [StringLength(512)]
    public string Method { get; set; } = null!;

    /// <summary>
    /// Kỳ dự báo (vd. "2025-06", "2025-Q3")
    /// </summary>
    [StringLength(1024)]
    public string? Period { get; set; } = null!;

    /// <summary>
    /// Thành phần level ℓ_t của Holt-Winters
    /// </summary>
    public double? Level { get; set; }

    /// <summary>
    /// Thành phần trend b_t của Holt-Winters
    /// </summary>
    public double? Trend { get; set; }

    /// <summary>
    /// Thành phần seasonal s_{t-m+h} của Holt-Winters
    /// </summary>
    public double? Seasonal { get; set; }

    /// <summary>
    /// Lower bound cho giá trị dự báo
    /// </summary>
    public double? LowerBound { get; set; }

    /// <summary>
    /// Upper bound cho giá trị dự báo
    /// </summary>
    public double? UpperBound { get; set; }

    /// <summary>
    /// Các tham số smoothing (α, β, γ) và period m
    /// </summary>
    [Column(TypeName = "json")]
    public string? ModelParameters { get; set; } = null!;

    /// <summary>
    /// Số bước của mùa vụ (seasonality period, ví dụ 12 tháng)
    /// </summary>
    public int? SeasonalityPeriod { get; set; }

    // <summary>
    // Số lượng đặt hàng kinh tế
    // </summary>
    public double? EOQ { get; set; }

    // <summary>
    // Mức hàng tồn kho an toàn
    // </summary>
    public double? SafetyStock { get; set; }

    // <summary>
    // Tồn kho tối ưu (EOQ + SafetyStock)
    // </summary>
    public double? OptimalInventory { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;

    public virtual Product? Product { get; set; }
    public virtual Warehouse? Warehouse { get; set; }
}
