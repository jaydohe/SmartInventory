namespace SI.Contract.WarehouseContract;

public class CreateWarehouseArg
{
    public string? WarehouseId { get; set; }
    public string? ManagerId { get; set; }
    public string? CategoryId { get; set; }
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public int Capacity { get; set; }
}
