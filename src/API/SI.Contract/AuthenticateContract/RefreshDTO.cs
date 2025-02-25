namespace SI.Contract.AuthenticateContract
{
    public class RefreshArg
    {
        public string RefreshToken { get; set; } = null!;
        public string AccessToken { get; set; } = null!;
    }

    public record RefreshResponse(string AccessToken, string RefreshToken, DateTime ExpireTime);
}
