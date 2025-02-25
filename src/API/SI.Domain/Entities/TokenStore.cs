using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SI.Domain.Common.Abstractions;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CTCore.DynamicQuery.Core.Domain;
using CTCore.DynamicQuery.OData.Core;
using CTCore.DynamicQuery.OData.Definations;
using SI.Domain.Enums;
using Microsoft.AspNetCore.Authorization;

namespace SI.Domain.Entities;
[ODataRouting("token-store", 
    IgnoredActions = [ApiActions.Delete, ApiActions.Update])]
[Authorize(Policy = APIPolicies.DEV)]
public class TokenStore : CTBaseEntity, IAuditableEntity
{
    [ForeignKey(nameof(User))]
    public required string UserId { get; set; }
    [StringLength(2048)]
    public required string AccessToken { get; set; } 
    [StringLength(1024)]
    public required string RefreshToken { get; set; } 
    public DateTimeOffset ExpiredAt { get; set; }
    public bool IsBlocked { get; set; }
    [StringLength(128)]
    public string? IpAddress { get; set; }
    [StringLength(1024)]
    public string? OSPlatform { get; set; }
    [StringLength(1024)]
    public string? Browser{ get; set; }
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }

    public virtual User? User{ get; set; }
    
    public void UpdateToken(string accessToken, string refreshToken, DateTime expRefreshTime)
    {
        this.AccessToken = accessToken;
        this.RefreshToken = refreshToken;
        this.ExpiredAt = expRefreshTime;
    }
    public void UpdateInformation(string IpAddress, string OSPlatform, string Browser)
    {
        this.IpAddress = IpAddress;
        this.OSPlatform = OSPlatform;
        this.Browser = Browser;
    }
    public void UpdateAccessTokenByRefreshToken(string accessToken)
    {
        this.AccessToken = accessToken;
    }
}

public class TokenStoreConfiguration : IEntityTypeConfiguration<TokenStore>
{
    public void Configure(EntityTypeBuilder<TokenStore> builder)
    {
       
    }
}
