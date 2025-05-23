using SI.Domain.Enums;

namespace SI.Contract.OrderContract;

public class UpdateOrderStatusArg
{
    public OrderStatus? OrderStatus { get; set; }
}
