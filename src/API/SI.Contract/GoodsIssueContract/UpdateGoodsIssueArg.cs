using SI.Domain.Enums;

namespace SI.Contract.GoodsIssueContract;

public class UpdateGoodsIssueArg
{
    public GoodsStatus? Status { get; set; }
    public string? Note { get; set; }
}
