using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.AuthenticateContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.AuthenticateFeatures.Commands;

public class UpdateMeInfoCommand(UpdateMeInfoArg arg) : ICommand<OkResponse> 
{
    public UpdateMeInfoArg Arg { get; set; } = arg;

    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateAccountInForCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateMeInfoCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<User> userRepos,
    IRepository<Employee> employeeRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<UpdateMeInfoCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateMeInfoCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;

        var checkUser = await userRepos.BuildQuery
            .FirstOrDefaultAsync(e => e.Id == userId, cancellationToken);
        if (checkUser is null)
            return CTBaseResult.NotFound("Người dùng");

        var checkLoginName = await userRepos.BuildQuery
            .FirstOrDefaultAsync(e => e.LoginName == request.Arg.LoginName, cancellationToken);
        if (checkLoginName != null && checkLoginName.LoginName != request?.Arg.LoginName)
            return CTBaseResult.UnProcess("Tên đăng nhập đã tồn tại.");

        var checkEmployee = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(e => e.Id == checkUser.EmployeeId, cancellationToken);
        if (checkEmployee is null)
            return CTBaseResult.NotFound("Nhân viên");

        checkUser.LoginName = request?.Arg.LoginName ?? checkUser.LoginName;
        checkUser.ModifiedOn = DateTimeOffset.UtcNow;
        checkEmployee.GenderType = request?.Arg.Gender ?? checkEmployee.GenderType;
        checkEmployee.PhoneNumber = request?.Arg.PhoneNumber ?? checkEmployee.PhoneNumber;
        checkEmployee.Email = request?.Arg.Email ?? checkEmployee.Email;
        checkEmployee.ModifiedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateAccountInForCommandValidator : AbstractValidator<UpdateMeInfoCommand>
{
    public UpdateAccountInForCommandValidator()
    {
        RuleFor(e => e.Arg.LoginName)
            .MaximumLength(512)
            .WithMessage("Tên đăng nhập tối đa 512 ký tự.")
            .Must(LoginName => LoginName == null || LoginName.All(c => char.IsLetterOrDigit(c) || c == '-' || c == '_'))
            .WithMessage("Tên đăng nhập chứa chữ cái, số và ký tự gạch ngang.");
        RuleFor(e => e.Arg.PhoneNumber)
            .MaximumLength(20)
            .WithMessage("Số điện thoại tối đa 20 ký tự.");
        RuleFor(e => e.Arg.Email)
            .MaximumLength(512)
            .WithMessage("Email tối đa 512 ký tự.");
    }
}
