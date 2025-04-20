namespace SI.Contract.OrderContract;

public class CreateOrderArg
{
    public string AgencyId { get; set; } = null!;
    public bool IsRefund { get; set; }
    public decimal? VAT { get; set; }
    public decimal? Discount { get; set; }
    public List<OrderDetailArg> OrderDetails { get; set; } = null!;
}

public class OrderDetailArg
{
    public string ProductId { get; set; } = null!; 
    public int Quantity { get; set; }
}
