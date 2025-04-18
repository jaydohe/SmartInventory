namespace SI.Contract.ProductContract;

public class UpdateProductArg
{
    public string? CategoryId { get; set; }
    public string? Name { get; set; }
    public string? Description { get; set; }
    public string? Unit { get; set; }
    public decimal? PurchasePrice { get; set; }
    public decimal? SellingPrice { get; set; }
    public decimal? HoldingCost { get; set; }
}
