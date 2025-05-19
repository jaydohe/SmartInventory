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
using SI.Domain.Enums;

namespace SI.Application.Features.GoodsReceiptFeatures.Commands;

public class CreateGoodsReceiptMaterialCommand(CreateGoodsReceiptMaterialArg arg) : ICommand<OkResponse>
{
    public CreateGoodsReceiptMaterialArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateGoodsReceiptMaterialCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateGoodsReceiptMaterialCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<MaterialSupplier> materialSupplierRepos,
    IRepository<GoodsReceipt> goodsReceiptRepos,
    IRepository<GoodsReceiptDetail> goodsReceiptDetailRepos,
    IRepository<Product> productRepos,
    IRepository<Inventory> inventoryRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<CreateGoodsReceiptMaterialCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateGoodsReceiptMaterialCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;
        var warehouseId = identifierProvider.WarehouseId;

        var checkMaterialSupplier = await materialSupplierRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.MaterialSupplierId && x.DeletedOn == null, cancellationToken);
        if (checkMaterialSupplier is null)
            return CTBaseResult.NotFound("Material Supplier");

        // Calculate total amount
        decimal totalAmount = 0;
        foreach (var item in request.Arg.Details)
        {
            var product = await productRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == item.ProductId && x.DeletedOn == null, cancellationToken);
            if (product is null)
                return CTBaseResult.NotFound("Product");

            totalAmount += item.QuantityReceived * product.PurchasePrice;
        }

        // Create Goods Receipt
        var goodsReceipt = new GoodsReceipt
        {
            MaterialSupplierId = request.Arg.MaterialSupplierId,
            UserId = userId,
            WarehouseId = warehouseId,
            Code = CodeGenerationUtils.GenerateCodeFromName("Nhập hàng từ nhà cung cấp nguyên vật liệu"),
            ShipperName = request.Arg.ShipperName,
            TotalAmount = totalAmount,
            Note = request.Arg.Note,
            Status = GoodsStatus.PENDING
        };
        goodsReceiptRepos.Add(goodsReceipt);

        // Create Goods Receipt Details
        foreach (var item in request.Arg.Details)
        {
            var product = await productRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == item.ProductId && x.DeletedOn == null, cancellationToken);
            if (product is null)
                return CTBaseResult.NotFound("Product");

            var goodsReceiptDetail = new GoodsReceiptDetail
            {
                GoodsReceiptId = goodsReceipt.Id,
                ProductId = item.ProductId,
                QuantityOrdered = item.QuantityReceived,
                QuantityReceived = item.QuantityReceived,
                TotalPrice = item.QuantityReceived * product.PurchasePrice
            };
            goodsReceiptDetailRepos.Add(goodsReceiptDetail);

            // Update Inventory
            var inventory = await inventoryRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.ProductId == item.ProductId && x.WarehouseId == warehouseId && x.DeletedOn == null, cancellationToken);
            if (inventory is null)
            {
                inventory = new Inventory
                {
                    ProductId = item.ProductId,
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

public class CreateGoodsReceiptMaterialCommandValidator : AbstractValidator<CreateGoodsReceiptMaterialCommand>
{
    public CreateGoodsReceiptMaterialCommandValidator()
    {
        RuleFor(x => x.Arg.MaterialSupplierId)
            .NotEmpty()
            .WithMessage("MaterialSupplierId is required.");
        RuleFor(x => x.Arg.ShipperName)
            .NotEmpty()
            .WithMessage("ShipperName is required");
        RuleFor(x => x.Arg.Details)
            .NotEmpty()
            .WithMessage("Details is required");
        RuleForEach(x => x.Arg.Details)
            .ChildRules(details =>
            {
                details.RuleFor(x => x.ProductId)
                    .NotEmpty()
                    .WithMessage("ProductId is required.");
                details.RuleFor(x => x.QuantityReceived)
                    .NotEmpty()
                    .WithMessage("Quantity received is required.")
                    .GreaterThanOrEqualTo(0)
                    .WithMessage("Quantity received must be greater than or equal to 0.");
            });
    }
}