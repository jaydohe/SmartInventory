using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.WarehouseContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.WarehouseFeatures.Commands;

public class UpdateWarehouseCommand(string id, UpdateWarehouseArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateWarehouseArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateWarehouseCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateWarehouseCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Warehouse> warehouseRepos,
    IRepository<Category> cateRepos,
    IRepository<Employee> empRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<UpdateWarehouseCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateWarehouseCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        if (role is "WAREHOUSE_STAFF")
        {
            var checkAccess = await empRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId && x.IsManager == true, cancellationToken);
            if (checkAccess is null)
                return CTBaseResult.UnProcess("Just manager can access.");
        }

        if (request.Arg.Name != null && request.Arg.Name.Trim() == "")
            return CTBaseResult.UnProcess("Name cannot consist only of whitespace.");
        if (request.Arg.Address != null && request.Arg.Address.Trim() == "")
            return CTBaseResult.UnProcess("Address cannot consist only of whitespace.");

        var checkWarehouse = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkWarehouse is null)
            return CTBaseResult.NotFound("Warehouse");
        if (request.Arg.Name != null && checkWarehouse.Name == request.Arg.Name)
            return CTBaseResult.UnProcess("Warehouse name has not been changed.");
        if (request.Arg.Address != null && checkWarehouse.Address == request.Arg.Address)
            return CTBaseResult.UnProcess("Warehouse address has not been changed.");
        if (request.Arg.Capacity > 0 && checkWarehouse.Capacity == request.Arg.Capacity)
            return CTBaseResult.UnProcess("Warehouse capacity has not been changed.");

        var checkMasterWarehouse = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.WarehouseId && x.DeletedOn == null, cancellationToken);
        if (request.Arg.WarehouseId != null && checkMasterWarehouse is null)
            return CTBaseResult.NotFound("Master Warehouse");

        var checkExisted = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null && checkExisted.CategoryId == request.Arg.CategoryId)
        {
            if (checkExisted.ManagerId == request.Arg.ManagerId)
                return CTBaseResult.UnProcess("The manager is already managing another warehouse.");

            return CTBaseResult.UnProcess("Warehouse already exists.");
        }

        if (request.Arg.CategoryId != null)
        {
            var checkCate = await cateRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.CategoryId && x.DeletedOn == null, cancellationToken);
            if (checkCate is null)
                return CTBaseResult.NotFound("Category");
            if (checkCate?.CategoryEntityType != CategoryEntityTypes.WAREHOUSE)
                return CTBaseResult.UnProcess("Category is not warehouse type.");
        }

        if (request.Arg.ManagerId != null)
        {
            var checkManager = await empRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.ManagerId && x.DeletedOn == null, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.NotFound("Employee");
            if (checkManager?.IsManager != true)
                return CTBaseResult.UnProcess("Only managers can manage the warehouse.");
            if (checkManager?.WarehouseId != null && checkManager?.WarehouseId != checkWarehouse.Id)
                return CTBaseResult.UnProcess("Manager had in another warehouse.");
            if (checkManager?.WarehouseId is null)
            {
                checkManager.WarehouseId = request.Arg.WarehouseId;
                checkManager.ModifiedOn = DateTimeOffset.UtcNow;
            }
        }

        checkWarehouse.WarehouseId = request.Arg.WarehouseId;
        checkWarehouse.ManagerId = request.Arg.ManagerId;
        checkWarehouse.CategoryId = request.Arg.CategoryId;
        if (request.Arg.Name != null)
        {
            checkWarehouse.Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name) ?? checkWarehouse.Code;
        }
        checkWarehouse.Name = request.Arg.Name ?? checkWarehouse.Name;
        checkWarehouse.Address = request.Arg.Address ?? checkWarehouse.Address;
        checkWarehouse.Capacity = request.Arg.Capacity ?? checkWarehouse.Capacity;
        checkWarehouse.ModifiedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateWarehouseCommandValidator : AbstractValidator<UpdateWarehouseCommand>
{
    public UpdateWarehouseCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .MaximumLength(1024)
            .WithMessage("Name is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Address)
            .MaximumLength(1024)
            .WithMessage("Address is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Capacity)
            .GreaterThan(0)
            .WithMessage("Capacity must be greater than 0.");
    }
}
