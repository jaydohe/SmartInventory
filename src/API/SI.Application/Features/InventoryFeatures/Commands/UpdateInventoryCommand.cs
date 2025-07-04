﻿using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.InventoryContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.InventoryFeatures.Commands;

public class UpdateInventoryCommand(string prodId, UpdateInventoryArg arg) : ICommand<OkResponse>
{
    public string ProductId { get; set; } = prodId;
    public UpdateInventoryArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateInventoryCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateInventoryCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Inventory> inventoryRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<UpdateInventoryCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateInventoryCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var warehouseId = identifierProvider.WarehouseId;

        var checkInventory = await inventoryRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.ProductId == request.ProductId && x.WarehouseId == warehouseId && x.DeletedOn == null, cancellationToken);
        if (checkInventory is null)
            return CTBaseResult.NotFound("Hàng hóa");

        checkInventory.Quantity = request.Arg.Quantity;
        
        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateInventoryCommandValidator : AbstractValidator<UpdateInventoryCommand>
{
    public UpdateInventoryCommandValidator()
    {
        RuleFor(x => x.Arg.Quantity)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Số lượng phải lớn hơn hoặc bằng 0.");
    }
}