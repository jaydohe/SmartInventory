namespace SI.Contract.SetupContract;

public class SetupDetailResponse
{
    public double? ZScore { get; set; }
    public double? MinStockLevel { get; set; }
    public DateTimeOffset? CreatedAt { get; set; }
    public DateTimeOffset? ModifiedOn { get; set; }
}
