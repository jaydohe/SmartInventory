namespace SI.Domain.Common.Authenticate;

public interface IUserIdentifierProvider
{
    public string UserId { get; }
    public string UnitId { get; }
    public string Role {  get; }
    public string Name { get; }
}
