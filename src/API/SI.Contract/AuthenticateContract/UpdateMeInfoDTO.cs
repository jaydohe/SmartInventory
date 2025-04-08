namespace SI.Contract.AuthenticateContract;

public class UpdatePasswordArg
{
    public string OldPassword { get; set; } = null!;
    public string NewPassword { get; set; } = null!;
    public string ConfirmPassword { get; set;} = null!;
}

public class UpdateMeInfoArg
{
    public string? Name { get; set; }
    public string? LoginName { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }


}
