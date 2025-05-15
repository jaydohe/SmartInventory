using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.WarehouseContract;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.WarehouseFeatures.Commands;

public class CreateWarehouseCommand(CreateWarehouseArg arg) : ICommand<OkResponse>
{
    public CreateWarehouseArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateWarehouseCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateWarehouseCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Warehouse> warehouseRepos,
    IRepository<Category> cateRepos,
    IRepository<Employee> empRepos) : ICommandHandler<CreateWarehouseCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateWarehouseCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkMasterWarehouse = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.WarehouseId && x.DeletedOn == null, cancellationToken);
        if (request.Arg.WarehouseId != null && checkMasterWarehouse is null)
            return CTBaseResult.NotFound("Warehouse");

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
            if (checkCate.CategoryEntityType != CategoryEntityTypes.WAREHOUSE)
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
            if (checkManager?.WarehouseId != null)
                return CTBaseResult.UnProcess("Manager had in another warehouse.");
            if (checkManager?.WarehouseId is null)
            {
                checkManager.WarehouseId = request.Arg.WarehouseId;
                checkManager.ModifiedOn = DateTimeOffset.UtcNow;
            }
        }

        var newWarehouse = new Warehouse
        {
            CategoryId = request.Arg.CategoryId,
            WarehouseId = request.Arg.WarehouseId,
            ManagerId = request.Arg.ManagerId,
            Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name),
            Name = request.Arg.Name,
            Address = request.Arg.Address,
            Capacity = request.Arg.Capacity
        };
        warehouseRepos.Add(newWarehouse);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateWarehouseCommandValidator : AbstractValidator<CreateWarehouseCommand>
{
    public CreateWarehouseCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(1024)
            .WithMessage("Name is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Address)
            .NotEmpty()
            .WithMessage("Address is required.")
            .MaximumLength(1024)
            .WithMessage("Address is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Capacity)
            .GreaterThan(0)
            .WithMessage("Capacity must be greater than 0.");
    }
}