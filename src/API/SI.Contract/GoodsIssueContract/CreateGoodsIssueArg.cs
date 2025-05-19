namespace SI.Contract.GoodsIssueContract;

public class CreateGoodsIssueArg
{
    public string OrderId { get; set; } = null!;
    public string? Note { get; set; }
    public List<GoodsIssueDetailArg> Details { get; set; } = null!;
}

public class GoodsIssueDetailArg
{
    public int QuantityIssued { get; set; }
}
