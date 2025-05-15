namespace SI.Contract.AgencyContract;

public class UpdateAgencyArg
{
    public string? Name { get; set; }
    public string? Representative { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
    public decimal? CurrentDebt { get; set; }
    public string? Note { get; set; }
}
