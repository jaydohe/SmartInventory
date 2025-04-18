using SI.Domain.Enums;

namespace SI.Contract.WarehouseContract;

public class GetWarehouseResult
{
    public string? Id { get; set; }
    public string? WarehouseId { get; set; }
    public string? ManagerId { get; set; }
    public string WardId { get; set; } = null!;
    public string DistrictId { get; set; } = null!;
    public string ProvinceId { get; set; } = null!;
    public string? CategoryId { get; set; }
    public string Code { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Address { get; set; } = null!;
    public int Capacity { get; set; }
    public DateTimeOffset CreateAt { get; set; }
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }
}
