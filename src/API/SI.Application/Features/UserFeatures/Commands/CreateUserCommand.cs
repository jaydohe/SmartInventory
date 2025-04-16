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
using SI.Domain.Enums;

namespace SI.Application.Features.UserFeatures.Commands;

public class CreateUserCommand(CreateUserArg arg) : ICommand<OkResponse>
{
    public CreateUserArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateUserCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateUserCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<User> userRepos,
    IRepository<Employee> employeeRepos,
    IConfiguration iconfiguration) : ICommandHandler<CreateUserCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateUserCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userRole = Enum.Parse<UserRoles>(request.Arg.UserRole);
        if (!Enum.IsDefined(typeof(UserRoles), userRole))
            return CTBaseResult.NotFound("User Role");

        if (userRole == UserRoles.DEV || userRole == UserRoles.ADMIN)
            return CTBaseResult.UnProcess("User Role is not allowed.");

        if (request.Arg.LoginName == null)
            return CTBaseResult.UnProcess("Login Name is required.");

        var checkEmp = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.EmployeeId && x.DeletedOn == null, cancellationToken);
        if (checkEmp is null)
            return CTBaseResult.NotFound("Employee");

        var checkUser = await userRepos.BuildQuery
            .Where(x => x.LoginName == request.Arg.LoginName || x.EmployeeId == request.Arg.EmployeeId)
            .FirstOrDefaultAsync(x => x.DeletedOn == null, cancellationToken);
        if (checkUser != null)
        {
            if (checkUser.LoginName == request.Arg.LoginName)
                return CTBaseResult.UnProcess("User is already exists.");

            if (checkUser.EmployeeId == request.Arg.EmployeeId)
                return CTBaseResult.UnProcess("User is already exists.");
        }

        var hashPassword = request.Arg.Password.ToSHA256(iconfiguration["Salt"]!);

        var newUser = new User
        {
            EmployeeId = request.Arg.EmployeeId,
            Name = checkEmp.Name,
            LoginName = request.Arg.LoginName,
            HashPassword = hashPassword,
            Role = userRole
        };
        userRepos.Add(newUser);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
{
    public CreateUserCommandValidator()
    {
        RuleFor(x => x.Arg.EmployeeId)
            .NotEmpty()
            .WithMessage("EmployeeId is required.");
        RuleFor(x => x.Arg.LoginName)
            .NotEmpty()
            .WithMessage("Login Name is required.")
            .MaximumLength(512)
            .WithMessage("Login Name is too long. Only up to 512 characters.")
            .Must(LoginName => LoginName != null && LoginName.All(c => char.IsLetterOrDigit(c) || c == '-' || c == '_'))
            .WithMessage("Login name can only contain letters, digits, dashes and underscores.");
        RuleFor(x => x.Arg.Password)
            .NotEmpty()
            .WithMessage("Password is required.")
            .Length(4, 32)
            .WithMessage("Password length must be between 4 and 32 characters.")
            .Must(pass => pass != null && pass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Password must contain only letters, digits, and punctuation.");
        RuleFor(x => x.Arg.UserRole)
            .NotEmpty()
            .WithMessage("User Role is required.");
    }
}