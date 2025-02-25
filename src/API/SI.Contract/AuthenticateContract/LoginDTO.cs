namespace SI.Contract.AuthenticateContract
{
    public class LoginArg
    {
        public string LoginName { get; set; } = null!;
        public string Password { get; set; } = null!;

    }

    public record LoginResponses(string AccessToken, string RefreshToken, DateTime ExpireTime);
}
