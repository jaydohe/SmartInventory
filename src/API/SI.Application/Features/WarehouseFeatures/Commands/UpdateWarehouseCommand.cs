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
                return CTBaseResult.UnProcess("Chỉ có quản lý được truy cập.");
        }

        if (request.Arg.Name != null && request.Arg.Name.Trim() == "")
            return CTBaseResult.UnProcess("Tên kho không được chỉ bao gồm khoảng trắng.");
        if (request.Arg.Address != null && request.Arg.Address.Trim() == "")
            return CTBaseResult.UnProcess("Địa chỉ không được chỉ bao gồm khoảng trắng.");

        var checkWarehouse = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkWarehouse is null)
            return CTBaseResult.NotFound("Kho, bãi");

        var checkMasterWarehouse = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.WarehouseId && x.DeletedOn == null, cancellationToken);
        if (request.Arg.WarehouseId != null && checkMasterWarehouse is null)
            return CTBaseResult.NotFound("Kho cha");

        var checkExisted = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null && checkExisted.CategoryId == request.Arg.CategoryId)
        {
            if (checkExisted.ManagerId == request.Arg.ManagerId)
                return CTBaseResult.UnProcess("Đang quản lý tại kho, bãi khác.");

            return CTBaseResult.UnProcess("Kho đã tồn tại.");
        }

        if (request.Arg.CategoryId != null)
        {
            var checkCate = await cateRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.CategoryId && x.DeletedOn == null, cancellationToken);
            if (checkCate is null)
                return CTBaseResult.NotFound("Danh mục kho");
            if (checkCate?.CategoryEntityType != CategoryEntityTypes.WAREHOUSE)
                return CTBaseResult.UnProcess("Bắt buộc là danh mục kho.");
        }

        if (request.Arg.ManagerId != null)
        {
            var checkManager = await empRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.ManagerId && x.DeletedOn == null, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.NotFound("Nhân viên");
            if (checkManager?.IsManager != true)
                return CTBaseResult.UnProcess("Chỉ có quản lý mới được quản lý kho.");
            if (checkManager?.WarehouseId != null && checkManager?.WarehouseId != checkWarehouse.Id)
                return CTBaseResult.UnProcess("Đang quản lý tại kho, bãi khác.");
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
            .WithMessage("Tên kho tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Address)
            .MaximumLength(1024)
            .WithMessage("Địa chỉ tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Capacity)
            .GreaterThan(0)
            .WithMessage("Sức chứa phải lớn hơn 0.");
    }
}
