namespace SI.Contract.AuthenticateContract;

public class GetMeArg
{
    public string? PositionId { get; set; }
    public string? PositionName { get; set; }
    public string UserId { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string LoginName { get; set; } = null!;
    public string? WareId { get; set; }
    public string? WareName { get; set; }
    public string? DepartmentId { get; set; }
    public string? DepartmentName { get; set; }
    public string? Gender { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public string? DateHired { get; set; }
}