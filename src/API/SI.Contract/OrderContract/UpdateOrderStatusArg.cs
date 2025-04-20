using SI.Domain.Enums;

namespace SI.Contract.OrderContract;

public class UpdateOrderStatusArg
{
    public string OrderStatus { get; set; } = null!;
}
