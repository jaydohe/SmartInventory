namespace SI.Contract.AuthenticateContract
{
    public class GetMeArg
    {
        public string UserId { get; set; } = null!;
        public string? UnitId { get; set; }
        public string Name { get; set; } = null!;
        public string UnitName { get; set; } = null!;
        public string LoginName { get; set; } = null!;
    }
}