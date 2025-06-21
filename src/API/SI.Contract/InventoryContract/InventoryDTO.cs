namespace SI.Contract.InventoryContract;

public class InventoryDTO
{
    public string Id { get; set; } = null!;
    public string ProductId { get; set; } = null!;
    public string ProductName { get; set; } = null!;
    public string ProductUnit { get; set; } = null!;
    public string WarehouseId { get; set; } = null!;
    public string WarehouseName { get; set; } = null!;
    public int Quantity { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}