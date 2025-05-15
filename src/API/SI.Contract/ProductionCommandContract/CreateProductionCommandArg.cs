namespace SI.Contract.ProductionCommandContract;

public class CreateProductionCommandArg
{
    public string? OrderId { get; set; }
    public string? Description { get; set; }
    public DateTimeOffset? PlannedStart { get; set; }
    public DateTimeOffset? PlannedEnd { get; set; }
    public List<ProductionCommandDetailArg> ProductionCommandDetails { get; set; } = null!;
}

public class RequestProductionCommandArg
{
    public string OrderId { get; set; } = null!;
    public string WareHouseId { get; set; } = null!;
}

public class ProductionCommandDetailArg
{
    public string ProductId { get; set; } = null!;
    public int Quantity { get; set; }
}