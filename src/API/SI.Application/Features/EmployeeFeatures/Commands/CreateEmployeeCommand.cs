using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.EmployeeContract;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.EmployeeFeatures.Commands;

public class CreateEmployeeCommand(CreateEmployeeArg arg) : ICommand<OkResponse>
{
    public CreateEmployeeArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateEmployeeCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateEmployeeCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Employee> employeeRepos,
    IRepository<Department> departmentRepos,
    IRepository<Position> positionRepos) : ICommandHandler<CreateEmployeeCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        if (request.Arg.Gender != GenderTypes.FEMALE &&
            request.Arg.Gender != GenderTypes.MALE &&
            request.Arg.Gender != GenderTypes.OTHER)
            return CTBaseResult.NotFound("Loại giới tính");

        var checkExisted = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.PhoneNumber == request.Arg.PhoneNumber && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null)
            return CTBaseResult.UnProcess("Nhân viên đã tồn tại.");

        var checkDepartment = await departmentRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.DepartmentId && x.DeletedOn == null, cancellationToken);
        if (checkDepartment is null)
            return CTBaseResult.NotFound("Phòng ban");

        var checkPosition = await positionRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.PositionId && x.DeletedOn == null, cancellationToken);
        if (checkPosition is null)
            return CTBaseResult.NotFound("Chức vụ");

        var newEmp = new Employee
        {
            PositionId = request.Arg.PositionId,
            DepartmentId = request.Arg.DepartmentId,
            Code = request.Arg.Code,
            Name = request.Arg.Name,
            GenderType = request.Arg.Gender,
            IsManager = request.Arg.IsManager,
            PhoneNumber = request.Arg.PhoneNumber,
            Email = request.Arg.Email,
            Address = request.Arg.Address,
            DateHired = request.Arg.DateHired
        };
        employeeRepos.Add(newEmp);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateEmployeeCommandValidator : AbstractValidator<CreateEmployeeCommand>
{
    public CreateEmployeeCommandValidator()
    {
        RuleFor(x => x.Arg.Code)
            .NotEmpty()
            .WithMessage("Mã số là bắt buộc.")
            .MaximumLength(100)
            .WithMessage("Mã số tối đa 100 ký tự.");
        RuleFor(x => x.Arg.Name)
            .NotEmpty()
            .WithMessage("Tên nhân viên là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Tên nhân viên tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.PhoneNumber)
            .NotEmpty()
            .WithMessage("Số điện thoại là bắt buộc.")
            .MaximumLength(20)
            .WithMessage("Số điện thoại tối đa 20 ký tự.");
        RuleFor(x => x.Arg.Email)
            .NotEmpty()
            .WithMessage("Email là bắt buộc.")
            .MaximumLength(512)
            .WithMessage("Email tối đa 512 ký tự.");
        RuleFor(x => x.Arg.Address)
            .NotEmpty()
            .WithMessage("Địa chỉ là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Địa chỉ tối đa 1024 ký tự.");
    }
}