using System.Text;
using SI.Domain.Enums;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

namespace SI.Webapi.Configurations;

public static class JWTConfiguration
{
    public static void AddJWTConfig(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthorization(options => {
            // Team phát triển
            options.AddPolicy(APIPolicies.DEV, policy =>
            {
                policy.RequireRole(
                    UserRoles.DEV.ToString());
            });
            // Admin
            options.AddPolicy(APIPolicies.ADMIN, policy =>
            {
                policy.RequireRole(
                    UserRoles.DEV.ToString(),
                    UserRoles.ADMIN.ToString());
            });
            // Nhân viên kho
            options.AddPolicy(APIPolicies.STAFFFULL, policy =>
            {
                policy.RequireRole(
                    UserRoles.DEV.ToString(),
                    UserRoles.ADMIN.ToString(),
                    UserRoles.WAREHOUSE_STAFF.ToString());
            });
            // Nhân viên sản xuất
            options.AddPolicy(APIPolicies.PRODUCERFULL, policy =>
            {
                policy.RequireRole(
                    UserRoles.DEV.ToString(),
                    UserRoles.ADMIN.ToString(),
                    UserRoles.WAREHOUSE_PRODUCER.ToString());
            });
            // Nhân viên bán hàng
            options.AddPolicy(APIPolicies.SALESFULL, policy =>
            {
                policy.RequireRole(
                    UserRoles.DEV.ToString(),
                    UserRoles.ADMIN.ToString(),
                    UserRoles.SALESMAN.ToString());
            });
            // Tất cả các quyền
            options.AddPolicy(APIPolicies.FULL, policy =>
            {
                policy.RequireRole(
                    UserRoles.DEV.ToString(),
                    UserRoles.ADMIN.ToString(),
                    UserRoles.WAREHOUSE_STAFF.ToString(),
                    UserRoles.WAREHOUSE_PRODUCER.ToString(),
                    UserRoles.SALESMAN.ToString());
            });
            // Nhân viên bán hàng và nhân viên kho
            options.AddPolicy(APIPolicies.STAFF_SALESMAN, policy =>
            {
                policy.RequireRole(
                    UserRoles.DEV.ToString(),
                    UserRoles.ADMIN.ToString(),
                    UserRoles.WAREHOUSE_STAFF.ToString(),
                    UserRoles.SALESMAN.ToString());
            });
        });
        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidIssuer = configuration["JwtSettings:Issuer"],
                ValidAudience = configuration["JwtSettings:Audience"],
                IssuerSigningKey = new SymmetricSecurityKey
                    (Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]!)),
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true
            };
        });

    }
}