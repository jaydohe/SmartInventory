using SI.Domain.Enums;

namespace SI.Contract.GoodsReceiptContract;

public class UpdateGoodsReceiptArg
{
    public GoodsStatus? Status { get; set; }
    public string? Note { get; set; }
}
