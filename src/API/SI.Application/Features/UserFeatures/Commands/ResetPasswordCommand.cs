using CTCore.DynamicQuery.Common.Definations;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SI.Contract.UserContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;

namespace SI.Application.Features.UserFeatures.Commands;

public class ResetPasswordCommand(string id, ResetPasswordArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public ResetPasswordArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        ResetPasswordCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class ResetPasswordCommandHandler(
        IUnitOfWork unitOfWork,
        IRepository<User> userRepos,
        IConfiguration iconfiguration,
        IUserIdentifierProvider identifierProvider
    ) : ICommandHandler<ResetPasswordCommand, OkResponse>
{

    public async Task<CTBaseResult<OkResponse>> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkUser = await userRepos.BuildQuery.FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);
        if (checkUser == null)
            return CTBaseResult.NotFound("Người dùng");

        if (request.Arg.Password != request.Arg.RePassword)
            return CTBaseResult.UnProcess("Xác nhận lại mật khẩu không đúng.");

        var hashPassword = request.Arg.Password.ToSHA256(iconfiguration["Salt"]!);

        checkUser.HashPassword = hashPassword;
        checkUser.ModifiedOn = DateTimeOffset.UtcNow;
        checkUser.ActivityResetPass(identifierProvider.Name, identifierProvider.Role, identifierProvider.WarehouseId);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class ResetPasswordCommandValidator : AbstractValidator<ResetPasswordCommand>
{
    public ResetPasswordCommandValidator()
    {
        RuleFor(x => x.Arg.Password)
            .NotEmpty()
            .WithMessage("Mật khẩu là bắt buộc.")
            .Length(4, 32)
            .WithMessage("Mật khẩu chỉ từ 4 đến 32 ký tự.")
            .Must(pass => pass != null && pass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Mật khẩu chỉ chứa chữ, số và ký tự đặc biệt.");
        RuleFor(e => e.Arg.RePassword)
           .NotEmpty()
            .WithMessage("Mật khẩu xác nhận là bắt buộc.")
           .Length(4, 32)
            .WithMessage("Mật khẩu xác nhận chỉ từ 4 đến 32 ký tự.")
           .Must(repass => repass != null && repass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Mật khẩu xác nhận chỉ chứa chữ, số và ký tự đặc biệt.");
    }
}