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

    public string WarehouseId => httpContextAccessor.HttpContext?.User.Claims
                ?.Where(c => c.Type == "warehouseId")
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

    public string PositionId => httpContextAccessor.HttpContext?.User.Claims
                ?.Where(c => c.Type == "positionId")
                .Select(c => c.Value)
                .First()!;

    public string EmployeeId => httpContextAccessor.HttpContext?.User.Claims
                ?.Where(c => c.Type == "employeeId")
                .Select(c => c.Value)
                .FirstOrDefault()!;


    // public bool IsClerical => bool.Parse(httpContextAccessor.HttpContext?.User.Claims
    //             ?.Where(c => c.Type == "IsClerical")
    //             .Select(c => c.Value)
    //             .FirstOrDefault() ?? "false");
}
