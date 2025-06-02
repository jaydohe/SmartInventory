namespace SI.Contract.BOMContract;

public class UpdateBOMArg
{
    public List<UpdateBOMDetailArg> BOMDetails { get; set; } = null!;
}

public class UpdateBOMDetailArg
{
    public string MaterialId { get; set; } = null!;
    public int Quantity { get; set; }
}