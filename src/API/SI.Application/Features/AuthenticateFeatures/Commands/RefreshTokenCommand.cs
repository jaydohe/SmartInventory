using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using SI.Contract.AuthenticateContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.AuthenticateFeatures.Commands;

public class RefreshTokenCommand(RefreshArg arg) : ICommand<OkDynamicResponse>
{
    public RefreshArg Arg { get; set; } = arg;

    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        RefreshTokensCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class RefreshTokenCommandHandler(
    IUnitOfWork unitOfWork,
    JWTTokenHelper jWTTokenHelper,
    IHttpContextAccessor httpContext,
    IRepository<User> userRepos,
    IRepository<TokenStore> tokenRepos) : ICommandHandler<RefreshTokenCommand, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var getRefresh = await tokenRepos.BuildQuery
            .FirstOrDefaultAsync(e => e.RefreshToken == request.Arg.RefreshToken, cancellationToken);

        if (getRefresh is null)
        {
            return CTBaseResult.NotFound("Invalid refresh token.");
        }

        if (getRefresh.AccessToken != request.Arg.AccessToken)
            return CTBaseResult.UnProcess("Invalid access token.");

        if (getRefresh.ExpiredAt <= DateTimeOffset.UtcNow)
            return CTBaseResult.UnProcess("Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại.");

        var ipAddress = httpContext?.HttpContext?.Connection.RemoteIpAddress?.MapToIPv4().ToString();
        var userAgent = httpContext?.HttpContext?.Request.Headers["User-Agent"].ToString();
        var browser = httpContext?.HttpContext?.Request.Headers["sec-ch-ua"].ToString();

        if (getRefresh.IpAddress != ipAddress || getRefresh.OSPlatform != userAgent || getRefresh.Browser != browser)
            return CTBaseResult.UnProcess("Environment mismatch. The request comes from an untrusted source.");

        var getUser = await userRepos.BuildQuery
            .FirstOrDefaultAsync(e => e.Id == getRefresh.UserId, cancellationToken);
        if (getUser is null)
            return CTBaseResult.NotFound("User");

        var newToken = jWTTokenHelper.GenerateJWTTokens(getUser, getRefresh.Id);

        getRefresh.UpdateAccessTokenByRefreshToken(newToken.AccessToken);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret < 0)
        {
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));
        }

        var result = new RefreshResponse(
            newToken.AccessToken,
            request.Arg.RefreshToken,
            newToken.ExpireTime
        );
        return CTBaseResult.Success(result);
    }
}

public class RefreshTokensCommandValidator : AbstractValidator<RefreshTokenCommand>
{
    public RefreshTokensCommandValidator()
    {
        RuleFor(x => x.Arg.AccessToken)
            .NotEmpty()
            .WithMessage("Access token is required.")
            .MaximumLength(2048)
            .WithMessage("Access token maximum 2048 characters.");
        RuleFor(x => x.Arg.RefreshToken)
            .NotEmpty()
            .WithMessage("Refresh token is required.")
            .MaximumLength(1024)
            .WithMessage("Refresh token maximum 1024 characters.");
    }
}
