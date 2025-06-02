using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using SI.Contract.AuthenticateContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;

namespace SI.Application.Features.AuthenticateFeatures.Commands;

public class UpdatePasswordCommand(UpdatePasswordArg arg) : ICommand<OkResponse>
{
    public UpdatePasswordArg Arg { get; set; } = arg;

    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdatePasswordCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdatePasswordCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<User> userRepos,
    IConfiguration iconfiguration,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<UpdatePasswordCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdatePasswordCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;

        var checkUser = await userRepos.BuildQuery
            .FirstOrDefaultAsync(e => e.Id == userId, cancellationToken);
        if (checkUser is null)
            return CTBaseResult.NotFound("Người dùng");

        var hashPassword = request.Arg.OldPassword.ToSHA256(iconfiguration["Salt"]!);
        if (hashPassword != checkUser.HashPassword)
            return CTBaseResult.UnProcess("Sai mật khẩu.");
        if (request.Arg.NewPassword != request.Arg.ConfirmPassword)
            return CTBaseResult.UnProcess("Xác nhận mật khẩu không khớp.");

        var hashNewPassword = request.Arg.NewPassword.ToSHA256(iconfiguration["Salt"]!);
        if (hashNewPassword == hashPassword)
            return CTBaseResult.UnProcess("Mật khẩu mới phải khác mật khẩu cũ.");

        checkUser.HashPassword = hashNewPassword;
        checkUser.ModifiedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdatePasswordCommandValidator : AbstractValidator<UpdatePasswordCommand>
{
    public UpdatePasswordCommandValidator()
    {
        RuleFor(e => e.Arg.OldPassword)
            .NotEmpty()
            .WithMessage("Mật khẩu là bắt buộc.")
            .Length(4, 32)
            .WithMessage("Mật khẩu ít nhất 4 ký tự và tối đa 32 ký tự.")
            .Must(pass => pass != null && pass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Mật khẩu chứa chữ cái, số và ký tự đặc biệt.");
        RuleFor(e => e.Arg.NewPassword)
            .NotEmpty()
            .WithMessage("Mật khẩu mới là bắt buộc.")
            .Length(4, 32)
            .WithMessage("Mật khẩu mới ít nhất 4 ký tự và tối đa 32 ký tự.")
            .Must(newPass => newPass != null && newPass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Mật khẩu mới chứa chữ cái, số và ký tự đặc biệt.");
        RuleFor(e => e.Arg.ConfirmPassword)
            .NotEmpty()
            .WithMessage("Xác nhận mật khẩu là bắt buộc.")
            .Length(4, 32)
            .WithMessage("Xác nhận mật khẩu ít nhất 4 ký tự và tối đa 32 ký tự.")
            .Must(confirmPass => confirmPass != null && confirmPass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Xác nhận mật khẩu chứa chữ cái, số và ký tự đặc biệt.");
    }
}
