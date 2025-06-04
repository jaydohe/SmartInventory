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
            return CTBaseResult.NotFound("Kho, bãi");

        var checkExisted = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null && checkExisted.CategoryId == request.Arg.CategoryId)
        {
            if (checkExisted.ManagerId == request.Arg.ManagerId)
                return CTBaseResult.UnProcess("Đang quản lý tại kho, bãi khác.");

            return CTBaseResult.UnProcess("Kho, bãi đã tồn tại.");
        }

        if (request.Arg.CategoryId != null)
        {
            var checkCate = await cateRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.CategoryId && x.DeletedOn == null, cancellationToken);
            if (checkCate is null)
                return CTBaseResult.NotFound("Danh mục kho");
            if (checkCate.CategoryEntityType != CategoryEntityTypes.WAREHOUSE)
                return CTBaseResult.UnProcess("Bắt buộc là danh mục kho.");
        }

        if (request.Arg.ManagerId != null)
        {
            var checkManager = await empRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.ManagerId && x.DeletedOn == null, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.NotFound("Nhân viên");
            if (checkManager?.IsManager != true)
                return CTBaseResult.UnProcess("Chỉ có quản lý mới được quản lý kho");
            if (checkManager?.WarehouseId != null)
                return CTBaseResult.UnProcess("Đang quản lý tại kho, bãi khác.");
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
            .WithMessage("Tên kho là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Tên kho tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Address)
            .NotEmpty()
            .WithMessage("Địa chỉ là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Địa chỉ tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Capacity)
            .GreaterThan(0)
            .WithMessage("Sức chứa phải lớn hơn 0.");
    }
}