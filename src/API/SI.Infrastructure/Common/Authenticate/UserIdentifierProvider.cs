using Microsoft.AspNetCore.Http;
using SI.Domain.Common.Authenticate;
using System.Security.Claims;

namespace SI.Infrastructure.Common.Authenticate;

public class UserIdentitfierProvider(IHttpContextAccessor httpContextAccessor) : IUserIdentifierProvider
{
    public string UserId => httpContextAccessor.HttpContext?.User.Claims
                ?.Where(c => c.Type == "userId")
                .Select(c => c.Value)
                .First()!;

    public string WareId => httpContextAccessor.HttpContext?.User.Claims
                ?.Where(c => c.Type == "wareId")
                .Select(c => c.Value)
                .First()!;

    public string Role => httpContextAccessor.HttpContext?.User.Claims
                ?.Where(c => c.Type == ClaimTypes.Role)
                .Select(c => c.Value)
                .First()!;

    public string Name => httpContextAccessor.HttpContext?.User.Claims
                ?.Where(c => c.Type == "name")
                .Select(c => c.Value)
                .First()!;


    // public bool IsClerical => bool.Parse(httpContextAccessor.HttpContext?.User.Claims
    //             ?.Where(c => c.Type == "IsClerical")
    //             .Select(c => c.Value)
    //             .FirstOrDefault() ?? "false");
}
