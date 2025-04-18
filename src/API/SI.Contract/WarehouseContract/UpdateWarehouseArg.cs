using SI.Domain.Enums;

namespace SI.Contract.WarehouseContract;

public class UpdateWarehouseArg
{
    public string? WarehouseId { get; set; }
    public string? ManagerId { get; set; }
    public string? WardId { get; set; }
    public string? DistrictId { get; set; }
    public string? ProvinceId { get; set; }
    public string? CategoryId { get; set; }
    public string? Name { get; set; }
    public string? Address { get; set; }
    public int? Capacity { get; set; }
}