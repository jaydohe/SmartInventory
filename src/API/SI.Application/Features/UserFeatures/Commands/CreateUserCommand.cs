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
            return CTBaseResult.NotFound("Quyền");

        if (userRole == UserRoles.DEV || userRole == UserRoles.ADMIN)
            return CTBaseResult.UnProcess("Không được phép tạo quyền này.");

        if (request.Arg.LoginName == null)
            return CTBaseResult.UnProcess("Tên đăng nhập là bắt buộc.");

        var checkEmp = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.EmployeeId && x.DeletedOn == null, cancellationToken);
        if (checkEmp is null)
            return CTBaseResult.NotFound("Nhân viên");

        var checkUser = await userRepos.BuildQuery
            .Where(x => x.LoginName == request.Arg.LoginName || x.EmployeeId == request.Arg.EmployeeId)
            .FirstOrDefaultAsync(x => x.DeletedOn == null, cancellationToken);
        if (checkUser != null)
        {
            if (checkUser.LoginName == request.Arg.LoginName)
                return CTBaseResult.UnProcess("Tên đăng nhập đã tồn tại.");

            if (checkUser.EmployeeId == request.Arg.EmployeeId)
                return CTBaseResult.UnProcess("Nhân viên đã có tài khoản.");
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
            .WithMessage("Id của nhân viên là bắt buộc.");
        RuleFor(x => x.Arg.LoginName)
            .NotEmpty()
            .WithMessage("Tên đăng nhập là bắt buộc.")
            .MaximumLength(512)
            .WithMessage("Tên đăng nhập tối đa 512 ký tự.")
            .Must(LoginName => LoginName != null && LoginName.All(c => char.IsLetterOrDigit(c) || c == '-' || c == '_'))
            .WithMessage("Tên đăng nhập chỉ chứa chữ, số và gạch ngang.");
        RuleFor(x => x.Arg.Password)
            .NotEmpty()
            .WithMessage("Mật khẩu là bắt buộc.")
            .Length(4, 32)
            .WithMessage("Mật khẩu chỉ từ 4 đến 32 ký tự.")
            .Must(pass => pass != null && pass.All(c => char.IsLetterOrDigit(c) || char.IsPunctuation(c)))
            .WithMessage("Mật khẩu chỉ chứa chữ, số và ký tự đặc biệt.");
        RuleFor(x => x.Arg.UserRole)
            .NotEmpty()
            .WithMessage("Quyền là bắt buộc.");
    }
}