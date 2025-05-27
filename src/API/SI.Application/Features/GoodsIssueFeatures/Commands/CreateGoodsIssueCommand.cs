using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.GoodsIssueContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Entities.GoodsIssues;
using SI.Domain.Entities.Orders;
using SI.Domain.Enums;

namespace SI.Application.Features.GoodsIssueFeatures.Commands;

public class CreateGoodsIssueCommand(CreateGoodsIssueArg arg) : ICommand<OkResponse>
{
    public CreateGoodsIssueArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateGoodsIssueCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateGoodsIssueCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<GoodsIssue> goodsIssueRepos,
    IRepository<GoodsIssueDetail> goodsIssueDetailRepos,
    IRepository<Product> productRepos,
    IRepository<Order> orderRepos,
    IRepository<OrderDetail> orderDetailRepos,
    IRepository<Inventory> inventoryRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<CreateGoodsIssueCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateGoodsIssueCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;
        var warehouseId = identifierProvider.WarehouseId;

        var checkOrder = await orderRepos.BuildQuery
            .Include(x => x.Agency)
            .FirstOrDefaultAsync(x => x.Id == request.Arg.OrderId && x.DeletedOn == null, cancellationToken);
        if (checkOrder is null)
            return CTBaseResult.NotFound("Đơn hàng");

        var checkOrderDetail = await orderDetailRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.OrderId == request.Arg.OrderId && x.DeletedOn == null, cancellationToken);
        if (checkOrderDetail is null)
            return CTBaseResult.NotFound("Chi tiết đơn hàng");

        // Calculate total amount
        decimal subTotal = 0;
        foreach (var item in request.Arg.Details)
        {
            var product = await productRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == checkOrderDetail.ProductId && x.DeletedOn == null, cancellationToken);
            if (product is null)
                return CTBaseResult.NotFound("Hàng hóa");

            subTotal += item.QuantityIssued * checkOrderDetail.UnitPrice;
        }

        // Calculate total amount
        var vat = checkOrder.VAT ?? 0;
        var discount = checkOrder.Discount ?? 0;
        var discountAmount = subTotal * (discount / 100m);
        var vatAmount = (subTotal - discountAmount) * (vat / 100m);
        var totalAmount = (subTotal - discountAmount) + vatAmount;

        // Create Goods Issue
        var goodsIssue = new GoodsIssue
        {
            UserId = userId,
            WarehouseId = warehouseId,
            AgencyId = checkOrder.AgencyId,
            OrderId = request.Arg.OrderId,
            Code = CodeGenerationUtils.GenerateCodeFromName($"Xuất hàng tới đại lý " + checkOrder.Agency.Name),
            TotalAmount = totalAmount,
            Note = request.Arg.Note,
            Status = GoodsStatus.PENDING
        };
        goodsIssueRepos.Add(goodsIssue);

        // Create Goods Issue Detail
        foreach (var item in request.Arg.Details)
        {
            var goodsIssueDetail = new GoodsIssueDetail
            {
                GoodsIssueId = goodsIssue.Id,
                ProductId = item.ProductId ?? checkOrderDetail.ProductId,
                QuantityRequested = item.QuantityRequested > 0 ? item.QuantityRequested : checkOrderDetail.Quantity,
                QuantityIssued = item.QuantityIssued,
                TotalPrice = item.QuantityIssued * checkOrderDetail.UnitPrice
            };
            goodsIssueDetailRepos.Add(goodsIssueDetail);

            // Update Inventory
            var inventory = await inventoryRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.ProductId == checkOrderDetail.ProductId && x.WarehouseId == warehouseId, cancellationToken);
            if (inventory is null)
                return CTBaseResult.UnProcess("Hàng hóa trong kho chưa tồn tại.");

            inventory.Quantity -= item.QuantityIssued;
            inventory.ModifiedOn = DateTimeOffset.UtcNow;
        }

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateGoodsIssueCommandValidator : AbstractValidator<CreateGoodsIssueCommand>
{
    public CreateGoodsIssueCommandValidator()
    {
        RuleFor(x => x.Arg.OrderId)
            .NotEmpty()
            .WithMessage("Id của đơn hàng là bắt buộc.");
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Ghi chú tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Details)
            .NotEmpty()
            .WithMessage("Chi tiết đơn hàng là bắt buộc.");
        RuleForEach(x => x.Arg.Details)
            .ChildRules(details =>
            {
                details.RuleFor(x => x.QuantityIssued)
                    .NotEmpty()
                    .WithMessage("Số lượng xuất là bắt buộc.")
                    .GreaterThanOrEqualTo(0)
                    .WithMessage("Số lượng xuất phải lớn hơn hoặc bằng 0.");
            });
    }
}