using SI.Domain.Enums;

namespace SI.Contract.OrderContract;

public class OrderResult
{
    public string Id { get; set; } = null!;
    public string Code { get; set; } = null!;
    public string AgencyId { get; set; } = null!;
    public decimal TotalAmount { get; set; }
    public bool IsRefund { get; set; }
    public OrderStatus OrderStatus { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }
    public List<OrderDetailDTO> Details { get; set; } = null!;

}

public class OrderDetailDTO
{
    public string Id { get; set; }
    public string ProductId { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
}