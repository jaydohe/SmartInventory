using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SI.Contract.AuthenticateContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;

namespace SI.Application.Features.AuthenticateFeatures.Commands;

public class LoginCommand(LoginArg arg) : ICommand<OkDynamicResponse>
{
    public LoginArg Arg { get; set; } = arg;

    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        LoginCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }

}

public class LoginCommandHandler(
    IUnitOfWork unitOfWork,
    JWTTokenHelper jWTTokenHelper,
    IConfiguration iconfiguration,
    IRepository<User> userRepos,
    IRepository<TokenStore> tokenRepos,
    IHttpContextAccessor httpContext) : ICommandHandler<LoginCommand, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var getUser = await userRepos.BuildQuery
            .Include(e => e.Employee)
            .ThenInclude(e => e.Warehouse)
            .FirstOrDefaultAsync(e => e.LoginName == request.Arg.LoginName, cancellationToken);
        if (getUser is null)
            return CTBaseResult.NotFound("Người dùng");

        if (getUser.IsLogin == false)
            return CTBaseResult.UnProcess("Tài khoản của bạn đã bị khóa.");

        if (iconfiguration["Salt"] is null)
            return CTBaseResult.ErrorServer("Invalid salt.");

        var hashPassword = request.Arg.Password.ToSHA256(iconfiguration["Salt"]!);

        var isUserValid = getUser.HashPassword == hashPassword;
        if (!isUserValid)
            return CTBaseResult.UnProcess("Sai mật khẩu.");

        var createToken = getUser.CreateToken();

        var genToken = jWTTokenHelper.GenerateJWTTokens(getUser, createToken.Id);

        createToken.UpdateToken(genToken.AccessToken, genToken.RefreshToken, DateTime.Now.AddMonths(1));

        var browser = httpContext?.HttpContext?.Request.Headers["sec-ch-ua"].ToString();
        var userAgent = httpContext?.HttpContext?.Request.Headers["User-Agent"].ToString();
        var ipAddress = httpContext?.HttpContext?.Connection.RemoteIpAddress?.MapToIPv4().ToString();

        createToken.UpdateInformation(ipAddress ?? "127.0.0.1", userAgent ?? "N/A", browser ?? "N/A");
        tokenRepos.Add(createToken);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        var result = new LoginResponses(
            genToken.AccessToken,
            genToken.RefreshToken,
            genToken.ExpireTime
        );
        return CTBaseResult.Success(result);
    }
}

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(e => e.Arg.LoginName)
            .NotEmpty()
            .WithMessage("Tên đăng nhập là bắt buộc.")
            .MaximumLength(512)
            .WithMessage("Tên đăng nhập tối đa 512 ký tự.")
            .Must(LoginName => LoginName != null && LoginName.All(c => char.IsLetterOrDigit(c) || c == '-' || c == '_'))
            .WithMessage("Tên đăng nhập chứa chữ cái, số và ký tự gạch ngang.");
        RuleFor(e => e.Arg.Password)
            .NotEmpty()
            .WithMessage("Mật khẩu là bắt buộc..")
            .Length(4, 32)
            .WithMessage("Mật khẩu ít nhất 4 ký tự và tối đa 32 ký tự.")
            .Must(pass => pass != null && pass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Mật khẩu chứa chữ cái, số và ký tự đặc biệt.");
    }
}