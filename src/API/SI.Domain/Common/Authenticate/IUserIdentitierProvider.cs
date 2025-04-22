namespace SI.Domain.Common.Authenticate;

public interface IUserIdentifierProvider
{
    public string UserId { get; }
    public string WareId { get; }
    public string Role {  get; }
    public string Name { get; }
    public string PositionId { get; }
    public string EmployeeId { get; }
}
