using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.EmployeeContract;
using SI.Domain.Entities;

namespace SI.Application.Features.EmployeeFeatures.Commands;

public class UpdateEmployeeCommand(string id, UpdateEmployeeArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateEmployeeArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateEmployeeCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateEmployeeCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Employee> employeeRepos,
    IRepository<Department> departmentRepos) : ICommandHandler<UpdateEmployeeCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkEmp = await employeeRepos.BuildQuery
            .Include(e => e.Department)
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkEmp is null)
            return CTBaseResult.NotFound("Employee");

        if (request.Arg.DepartmentId != null)
        {
            var checkEmpDepartment = await departmentRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.DepartmentId && x.DeletedOn == null, cancellationToken);
            if (checkEmpDepartment is null)
                return CTBaseResult.NotFound("Department");
        }

        checkEmp.DepartmentId = request.Arg.DepartmentId ?? checkEmp.DepartmentId;
        checkEmp.WardId = request.Arg.WardId ?? checkEmp.WardId;
        checkEmp.DistrictId = request.Arg.DistrictId ?? checkEmp.DistrictId;
        checkEmp.ProvinceId = request.Arg.ProvinceId ?? checkEmp.ProvinceId;
        checkEmp.PositionId = request.Arg.PositionId ?? checkEmp.PositionId;
        checkEmp.Name = request.Arg.Name ?? checkEmp.Name;
        checkEmp.GenderType = request.Arg.Gender ?? checkEmp.GenderType;
        checkEmp.PhoneNumber = request.Arg.PhoneNumber ?? checkEmp.PhoneNumber;
        checkEmp.Email = request.Arg.Email ?? checkEmp.Email;
        checkEmp.Address = request.Arg.Address ?? checkEmp.Address;
        checkEmp.ModifiedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateEmployeeCommandValidator : AbstractValidator<UpdateEmployeeCommand>
{
    public UpdateEmployeeCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .MaximumLength(1024)
            .WithMessage("Name is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.PhoneNumber)
            .MaximumLength(20)
            .WithMessage("Phone Number is too long. Only up to 20 characters.");
        RuleFor(x => x.Arg.Email)
            .MaximumLength(512)
            .WithMessage("Email is too long. Only up to 512 characters.");
        RuleFor(x => x.Arg.Address)
            .MaximumLength(1024)
            .WithMessage("Address is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Position)
            .MaximumLength(512)
            .WithMessage("Position is too long. Only up to 512 characters.");
    }
}