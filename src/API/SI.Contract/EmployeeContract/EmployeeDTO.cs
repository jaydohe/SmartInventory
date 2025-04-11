namespace SI.Contract.EmployeeContract;

public class EmployeeDTO
{
    public string Id { get; set; } = null!;
    public string? DepartmentId { get; set; }
    public string WardId { get; set; } = null!;
    public string DistrictId { get; set; } = null!;
    public string ProvinceId { get; set; } = null!;
    public string? WarehouseId { get; set; }
    public string Name { get; set; } = null!;
    public bool IsMale { get; set; }
    public string PhoneNumber { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string Position { get; set; } = null!;
    public DateTime DateHired { get; set; }
}
