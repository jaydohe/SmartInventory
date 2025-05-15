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
    IRepository<Department> departmentRepos,
    IRepository<Position> positionRepos,
    IRepository<Warehouse> wareRepos,
    IRepository<User> userRepos) : ICommandHandler<UpdateEmployeeCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateEmployeeCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        if (request.Arg.Name != null && request.Arg.Name.Trim() == "")
            return CTBaseResult.UnProcess("Name cannot consist only of whitespace.");
        if (request.Arg.PhoneNumber != null && request.Arg.PhoneNumber.Trim() == "")
            return CTBaseResult.UnProcess("Phone Number cannot consist only of whitespace.");
        if (request.Arg.Email != null && request.Arg.Email.Trim() == "")
            return CTBaseResult.UnProcess("Email cannot consist only of whitespace.");
        if (request.Arg.Address != null && request.Arg.Address.Trim() == "")
            return CTBaseResult.UnProcess("Address cannot consist only of whitespace.");

        if (request.Arg.Gender != null && request.Arg.Gender != GenderTypes.FEMALE &&
            request.Arg.Gender != GenderTypes.MALE &&
            request.Arg.Gender != GenderTypes.OTHER)
            return CTBaseResult.NotFound("Gender Type");

        var checkEmp = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkEmp is null)
            return CTBaseResult.NotFound("Employee");
        if (request.Arg.Name != null && checkEmp.Name == request.Arg.Name)
            return CTBaseResult.UnProcess("Warehouse name has not been changed.");
        if (request.Arg.PhoneNumber != null && checkEmp.PhoneNumber == request.Arg.PhoneNumber)
            return CTBaseResult.UnProcess("Phone Number has not been changed.");
        if (request.Arg.Email != null && checkEmp.Email == request.Arg.Email)
            return CTBaseResult.UnProcess("Email has not been changed.");
        if (request.Arg.Address != null && checkEmp.Address == request.Arg.Address)
            return CTBaseResult.UnProcess("Address has not been changed.");

        var checkDepartment = await departmentRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.DepartmentId && x.DeletedOn == null, cancellationToken);
        if (request.Arg.DepartmentId != null && checkDepartment is null)
            return CTBaseResult.NotFound("Department");

        var checkPosition = await positionRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.PositionId && x.DeletedOn == null, cancellationToken);
        if (request.Arg.PositionId != null && checkPosition is null)
            return CTBaseResult.NotFound("Position");

        var checkWarehouse = await wareRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.WarehouseId && x.DeletedOn == null, cancellationToken);
        if (request.Arg.WarehouseId != null && checkWarehouse is null)
            return CTBaseResult.NotFound("Warehouse");

        if (request.Arg.WarehouseId != null && checkEmp.IsManager == true)
        {
            var updateWarehouse = await wareRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == checkEmp.WarehouseId && x.ManagerId == checkEmp.Id && x.DeletedOn == null, cancellationToken);
            if (updateWarehouse != null)
            {
                updateWarehouse.ManagerId = string.Empty;
                updateWarehouse.ModifiedOn = DateTimeOffset.UtcNow;
            }
        }

        if (request.Arg.Name != null)
        {
            var updateUser = await userRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.EmployeeId == checkEmp.Id && x.DeletedOn == null, cancellationToken);
            if (updateUser is null)
                return CTBaseResult.NotFound("User");

            updateUser.Name = request.Arg.Name ?? updateUser.Name;
            updateUser.ModifiedOn = DateTimeOffset.UtcNow;
        }

        checkEmp.DepartmentId = request.Arg.DepartmentId ?? checkEmp.DepartmentId;
        checkEmp.WarehouseId = request.Arg.WarehouseId ?? checkEmp.WarehouseId;
        checkEmp.PositionId = request.Arg.PositionId ?? checkEmp.PositionId;
        checkEmp.Name = request.Arg.Name ?? checkEmp.Name;
        checkEmp.GenderType = request.Arg.Gender ?? checkEmp.GenderType;
        checkEmp.IsManager = request.Arg.IsManager ?? checkEmp.IsManager;
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
    }
}