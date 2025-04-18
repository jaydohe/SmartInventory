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
            return CTBaseResult.NotFound("Gender Type");

        var checkExisted = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.PhoneNumber == request.Arg.PhoneNumber && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null)
            return CTBaseResult.UnProcess("Employee is existed.");

        var checkDepartment = await departmentRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.DepartmentId && x.DeletedOn == null, cancellationToken);
        if (checkDepartment is null)
            return CTBaseResult.NotFound("Department");

        var checkPosition = await positionRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.PositionId && x.DeletedOn == null, cancellationToken);
        if (checkPosition is null)
            return CTBaseResult.NotFound("Position");

        var newEmp = new Employee
        {
            PositionId = request.Arg.PositionId,
            DepartmentId = request.Arg.DepartmentId,
            WardId = request.Arg.WardId,
            DistrictId = request.Arg.DistrictId,
            ProvinceId = request.Arg.ProvinceId,
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
            .WithMessage("Code is required.")
            .MaximumLength(100)
            .WithMessage("Code is too long. Only up to 100 characters.");
        RuleFor(x => x.Arg.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(1024)
            .WithMessage("Name is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.PhoneNumber)
            .NotEmpty()
            .WithMessage("Phone Number is required.")
            .MaximumLength(20)
            .WithMessage("Phone Number is too long. Only up to 20 characters.");
        RuleFor(x => x.Arg.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .MaximumLength(512)
            .WithMessage("Email is too long. Only up to 512 characters.");
        RuleFor(x => x.Arg.Address)
            .NotEmpty()
            .WithMessage("Address is required.")
            .MaximumLength(1024)
            .WithMessage("Address is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.ProvinceId)
            .NotEmpty()
            .WithMessage("ProvinceId is required.");
        RuleFor(x => x.Arg.DistrictId)
            .NotEmpty()
            .WithMessage("DistrictId is required.");
        RuleFor(x => x.Arg.WardId)
            .NotEmpty()
            .WithMessage("WardId is required.");

    }
}