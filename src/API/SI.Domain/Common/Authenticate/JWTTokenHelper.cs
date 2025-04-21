using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using SI.Domain.Entities;

namespace SI.Domain.Common.Authenticate;
public record Tokens(string AccessToken, string RefreshToken, DateTime ExpireTime);
public sealed class JWTTokenHelper(IConfiguration iconfiguration)
{
    public Tokens GenerateJWTTokens(User account, string tokenId)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var tokenKey = Encoding.UTF8.GetBytes(iconfiguration["JwtSettings:Key"]!);
        var claims = new List<Claim>()
            {
                new(JwtRegisteredClaimNames.Jti, tokenId),
                new(JwtRegisteredClaimNames.Sub, "sub.trang1753@com"),
                new(JwtRegisteredClaimNames.Email, "thientrang.1753@gmail.com"),
                new("userId", account.Id),
                new("warehouseId", account.Employee?.WarehouseId ?? "null"),
                new("name", account.Name),
                new("positionId", account.Employee?.PositionId is null ? "null" : account.Employee.PositionId),
                new("employeeId", account.EmployeeId is null ? "null" : account.EmployeeId),
                new(ClaimTypes.Role,  account.Role.ToString())
            };
        var expTime = DateTime.Now.AddMonths(1);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = expTime,
            Issuer = iconfiguration["JwtSettings:Issuer"]!,
            Audience = iconfiguration["JwtSettings:Audience"]!,
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var refreshToken = GenerateRefreshToken(account.LoginName);
        var result = new Tokens(tokenHandler.WriteToken(token), refreshToken, expTime);
        return result;
    }

    public static string GenerateRefreshToken(string userId)
    {
        var uniqueIdentifier = Guid.NewGuid().ToString();
        var refreshToken = $"{userId}:{uniqueIdentifier}";
        using var hmac = new HMACSHA256();
        var tokenBytes = Encoding.UTF8.GetBytes(refreshToken);
        var hash = hmac.ComputeHash(tokenBytes);
        return Convert.ToBase64String(hash);
    }

    public ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
    {
        var Key = Encoding.UTF8.GetBytes(iconfiguration["JwtSettings:Key"]!);

        var tokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Key),
            ClockSkew = TimeSpan.Zero
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);
        if (securityToken is not JwtSecurityToken jwtSecurityToken || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase))
        {
            throw new SecurityTokenException("Invalid token");
        }
        return principal;
    }
}