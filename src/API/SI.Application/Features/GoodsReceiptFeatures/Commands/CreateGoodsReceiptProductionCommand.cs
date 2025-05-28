using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.GoodsReceiptContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Entities.GoodsReceipts;
using SI.Domain.Entities.ProductionCommands;
using SI.Domain.Enums;

namespace SI.Application.Features.GoodsReceiptFeatures.Commands;

public class CreateGoodsReceiptProductionCommand(CreateGoodsReceiptProductionArg arg) : ICommand<OkResponse>
{
    public CreateGoodsReceiptProductionArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateGoodsReceiptCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateGoodsReceiptCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<ProductionCommand> productionCommandRepos,
    IRepository<ProductionCommandDetail> productionCommandDetailRepos,
    IRepository<GoodsReceipt> goodsReceiptRepos,
    IRepository<GoodsReceiptDetail> goodsReceiptDetailRepos,
    IRepository<Product> productRepos,
    IRepository<Inventory> inventoryRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<CreateGoodsReceiptProductionCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateGoodsReceiptProductionCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;
        var warehouseId = identifierProvider.WarehouseId;

        var checkProductionCommand = await productionCommandRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.ProductionCommandId && x.DeletedOn == null, cancellationToken);
        if (checkProductionCommand is null)
            return CTBaseResult.NotFound("Lệnh sản xuất");

        var checkProductionCommandDetail = await productionCommandDetailRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.ProductionCommandId == request.Arg.ProductionCommandId && x.DeletedOn == null, cancellationToken);
        if (checkProductionCommandDetail is null)
            return CTBaseResult.NotFound("Chi tiết của lệnh sản xuất");

        // Calculate total amount
        decimal totalAmount = 0;
        foreach (var item in request.Arg.Details)
        {
            var product = await productRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == checkProductionCommandDetail.ProductId && x.DeletedOn == null, cancellationToken);
            if (product is null)
                return CTBaseResult.NotFound("Mặt hàng");

            totalAmount += item.QuantityReceived * checkProductionCommandDetail.Price;
        }

        // Create Goods Receipt
        var goodsReceipt = new GoodsReceipt
        {
            ProductionCommandId = request.Arg.ProductionCommandId,
            UserId = userId,
            WarehouseId = warehouseId,
            Code = CodeGenerationUtils.GenerateCodeFromName("Nhập hàng từ khâu sản xuất"),
            ShipperName = request.Arg.ShipperName,
            TotalAmount = totalAmount,
            Note = request.Arg.Note,
            Status = GoodsStatus.PENDING
        };
        goodsReceiptRepos.Add(goodsReceipt);

        foreach (var item in request.Arg.Details)
        {
            var goodsReceiptDetail = new GoodsReceiptDetail
            {
                GoodsReceiptId = goodsReceipt.Id,
                ProductId = item.ProductId ?? checkProductionCommandDetail.ProductId,
                QuantityOrdered = item.QuantityOrdered > 0 ? item.QuantityOrdered : checkProductionCommandDetail.Quantity,
                QuantityReceived = item.QuantityReceived,
                TotalPrice = item.QuantityReceived * checkProductionCommandDetail.Price
            };
            goodsReceiptDetailRepos.Add(goodsReceiptDetail);

            // Update Inventory
            var inventory = await inventoryRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.ProductId == checkProductionCommandDetail.ProductId && x.WarehouseId == warehouseId && x.DeletedOn == null, cancellationToken);
            if (inventory is null)
            {
                inventory = new Inventory
                {
                    ProductId = checkProductionCommandDetail.ProductId,
                    WarehouseId = warehouseId,
                    Quantity = item.QuantityReceived,
                    CreatedAt = DateTimeOffset.UtcNow
                };
                inventoryRepos.Add(inventory);
            }
            else
            {
                inventory.Quantity += item.QuantityReceived;
                inventory.ModifiedOn = DateTimeOffset.UtcNow;
            }
        }

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateGoodsReceiptCommandValidator : AbstractValidator<CreateGoodsReceiptProductionCommand>
{
    public CreateGoodsReceiptCommandValidator()
    {
        RuleFor(x => x.Arg.ProductionCommandId)
            .NotEmpty()
            .WithMessage("Id của lệnh sản xuất là bắt buộc.");
        RuleFor(x => x.Arg.ShipperName)
            .NotEmpty()
            .WithMessage("Tên tài xế giao hàng là bắt buộc.").
            MaximumLength(512)
            .WithMessage("Tên tài xế tối đa 512 ký tự.");
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Ghi chú tối đa 1024 ký tự.");
        RuleForEach(x => x.Arg.Details)
            .ChildRules(details =>
            {
                details.RuleFor(x => x.ProductId)
                    .NotEmpty()
                    .WithMessage("Id của mặt hàng là bắt buộc.");
                details.RuleFor(x => x.QuantityReceived)
                    .NotEmpty()
                    .WithMessage("Số lượng nhận là bắt buộc.")
                    .GreaterThanOrEqualTo(0)
                    .WithMessage("Số lượng nhận phải lớn hơn hoặc bằng 0.");
            });
    }
}