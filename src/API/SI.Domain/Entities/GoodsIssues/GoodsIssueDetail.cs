using CTCore.DynamicQuery.Core.Domain;
using SI.Domain.Common.Abstractions;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities.GoodsIssues;

public class GoodsIssueDetail : CTBaseEntity, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(GoodsIssue))]
    public string GoodsIssueId { get; set; } = null!;

    [ForeignKey(nameof(Product))]
    public string ProductId { get; set; } = null!;

    // <summary>
    // Số lượng yêu cầu
    // </summary>
    public int QuantityRequested { get; set; }

    // <summary>
    // Số lượng xuất
    // </summary>
    public int QuantityIssued { get; set; }

    // <summary>
    // Tổng tiền sản phẩm : Số lượng * giá
    // </summary>
    public decimal TotalPrice { get; set; }

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual GoodsIssue? GoodsIssue { get; set; }
    public virtual Product? Product { get; set; }
}
