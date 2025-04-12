namespace SI.Contract.UserContract;

public class CreateUserArg
{
    public string? WarehouseId { get; set; }
    public string EmployeeId { get; set; } = null!;
    public string LoginName { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string UserRole { get; set; } = null!;
}
