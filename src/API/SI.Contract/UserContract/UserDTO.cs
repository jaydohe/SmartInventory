namespace SI.Contract.UserContract;

public class UserDTO
{
    public string Id { get; set; } = null!;
    public string EmployeeId { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string LoginName { get; set; } = null!;
    public bool IsLogin { get; set; }
    public string Role { get; set; } = null!;
}
