namespace SI.Contract.ProductContract;

public class CreateProductArg
{
    public string? MaterialSupplierId { get; set; }
    public string CategoryId { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Unit { get; set; } = null!;
    public string ProductType { get; set; } = null!;
    public decimal PurchasePrice { get; set; }
    public decimal SellingPrice { get; set; }
    public decimal HoldingCost { get; set; }
}
