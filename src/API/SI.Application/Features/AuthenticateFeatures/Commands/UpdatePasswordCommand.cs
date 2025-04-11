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
            return CTBaseResult.NotFound("User");

        var hashPassword = request.Arg.OldPassword.ToSHA256(iconfiguration["Salt"]!);
        if (hashPassword != checkUser.HashPassword)
            return CTBaseResult.UnProcess("Wrong password.");
        if (request.Arg.NewPassword != request.Arg.ConfirmPassword)
            return CTBaseResult.UnProcess("Confirm password does not match.");

        var hashNewPassword = request.Arg.NewPassword.ToSHA256(iconfiguration["Salt"]!);
        if (hashNewPassword == hashPassword)
            return CTBaseResult.UnProcess("New password must be different from old password.");

        checkUser.HashPassword = hashNewPassword;

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
            .WithMessage("Password is required.")
            .Length(4, 32)
            .WithMessage("Password length must be between 4 and 32 characters.")
            .Must(pass => pass != null && pass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Password must contain only letters, digits, and punctuation.");
        RuleFor(e => e.Arg.NewPassword)
            .NotEmpty()
            .WithMessage("New Password is required.")
            .Length(4, 32)
            .WithMessage("New Password length must be between 4 and 32 characters.")
            .Must(newPass => newPass != null && newPass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("New Password must contain only letters, digits, and punctuation.");
        RuleFor(e => e.Arg.ConfirmPassword)
            .NotEmpty()
            .WithMessage("Confirm Password is required.")
            .Length(4, 32)
            .WithMessage("Confirm Password length must be between 4 and 32 characters.")
            .Must(confirmPass => confirmPass != null && confirmPass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Re-enter New Password must contain only letters, digits, and punctuation.");

    }
}
