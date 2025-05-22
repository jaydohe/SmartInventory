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
using SI.Domain.Entities.Orders;
using SI.Domain.Enums;

namespace SI.Application.Features.GoodsReceiptFeatures.Commands;

public class CreateGoodsReceiptOrderCommand(CreateGoodsReceiptOrderArg arg) : ICommand<OkResponse>
{
    public CreateGoodsReceiptOrderArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateGoodsReceiptOrderCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateGoodsReceiptOrderCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Order> orderRepos,
    IRepository<OrderDetail> orderDetailRepos,
    IRepository<GoodsReceipt> goodsReceiptRepos,
    IRepository<GoodsReceiptDetail> goodsReceiptDetailRepos,
    IRepository<Product> productRepos,
    IRepository<Inventory> inventoryRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<CreateGoodsReceiptOrderCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateGoodsReceiptOrderCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;
        var warehouseId = identifierProvider.WarehouseId;

        var checkOrder = await orderRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.OrderId && x.DeletedOn == null, cancellationToken);
        if (checkOrder is null)
            return CTBaseResult.NotFound("Order");

        var checkOrderDetail = await orderDetailRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.OrderId == request.Arg.OrderId && x.DeletedOn == null, cancellationToken);
        if (checkOrderDetail is null)
            return CTBaseResult.NotFound("Order Detail");

        // Calculate total amount
        decimal subTotal = 0;
        foreach (var item in request.Arg.Details)
        {
            var product = await productRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == checkOrderDetail.ProductId && x.DeletedOn == null, cancellationToken);
            if (product is null)
                return CTBaseResult.NotFound("Product");

            subTotal += item.QuantityReceived * checkOrderDetail.UnitPrice;
        }

        // Calculate total amount
        var vat = checkOrder.VAT ?? 0;
        var discount = checkOrder.Discount ?? 0;
        var discountAmount = subTotal * (discount / 100m);
        var vatAmount = (subTotal - discountAmount) * (vat / 100m);

        decimal totalAmount;
        if (checkOrder.IsRefund == false)
        {
            totalAmount = (subTotal - discountAmount) + vatAmount;
        }
        else
        {
            totalAmount = -((subTotal - discountAmount) + vatAmount);
        }

        // Create Goods Receipt
        var goodsReceipt = new GoodsReceipt
        {
            OrderId = request.Arg.OrderId,
            UserId = userId,
            WarehouseId = warehouseId,
            Code = CodeGenerationUtils.GenerateCodeFromName("Nhập hàng từ đơn hàng"),
            ShipperName = request.Arg.ShipperName,
            TotalAmount = totalAmount,
            Note = request.Arg.Note,
            Status = GoodsStatus.PENDING
        };
        goodsReceiptRepos.Add(goodsReceipt);

        // Create Goods Receipt Details
        foreach (var item in request.Arg.Details)
        {
            var goodsReceiptDetail = new GoodsReceiptDetail
            {
                GoodsReceiptId = goodsReceipt.Id,
                ProductId = item.ProductId ?? checkOrderDetail.ProductId,
                QuantityOrdered = item.QuantityOrdered > 0 ? item.QuantityOrdered : checkOrderDetail.Quantity,
                QuantityReceived = item.QuantityReceived,
                TotalPrice = item.QuantityReceived * checkOrderDetail.UnitPrice
            };
            goodsReceiptDetailRepos.Add(goodsReceiptDetail);

            // Update Inventory
            var inventory = await inventoryRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.ProductId == checkOrderDetail.ProductId && x.WarehouseId == warehouseId && x.DeletedOn == null, cancellationToken);
            if (inventory is null)
            {
                inventory = new Inventory
                {
                    ProductId = checkOrderDetail.ProductId,
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

public class CreateGoodsReceiptOrderCommandValidator : AbstractValidator<CreateGoodsReceiptOrderCommand>
{
    public CreateGoodsReceiptOrderCommandValidator()
    {
        RuleFor(x => x.Arg.OrderId)
            .NotEmpty()
            .WithMessage("OrderId is required");
        RuleFor(x => x.Arg.ShipperName)
            .NotEmpty()
            .WithMessage("ShipperName is required")
            .MaximumLength(512)
            .WithMessage("ShipperName must be less than 512 characters");
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Note must be less than 1024 characters");
        RuleFor(x => x.Arg.Details)
            .NotEmpty()
            .WithMessage("Details is required");
        RuleForEach(x => x.Arg.Details)
            .ChildRules(details =>
            {
                details.RuleFor(x => x.QuantityReceived)
                    .NotEmpty()
                    .WithMessage("Quantity received is required.")
                    .GreaterThanOrEqualTo(0)
                    .WithMessage("Quantity received must be greater than or equal to 0.");
            });
    }
}