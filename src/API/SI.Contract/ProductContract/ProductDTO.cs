namespace SI.Contract.ProductContract;

public class GetProductResult
{
    public string? Id { get; set; }
    public string? MaterialSupplierId { get; set; }
    public string WarehouseId { get; set; } = null!;
    public string CategoryId { get; set; } = null!;
    public string Code { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Description { get; set; } = null!;
    public string Unit { get; set; } = null!;
    public string ProductType { get; set; } = null!;
    public decimal PurchasePrice { get; set; }
    public decimal SellingPrice { get; set; }
    public decimal HoldingCost { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }
}
