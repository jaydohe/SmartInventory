namespace SI.Contract.BOMContract;

public class CreateBOMArg
{
    public string ProductId { get; set; } = null!;
    public List<BOMDetailArg> BOMDetails { get; set; } = null!;
}

public class BOMDetailArg
{
    public string MaterialId { get; set; } = null!;
    public int Quantity { get; set; }
}
