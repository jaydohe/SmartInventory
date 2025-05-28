using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.OrderContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Entities.Orders;
using SI.Domain.Enums;

namespace SI.Application.Features.OrderFeatures.Commands;

public class CreateOrderCommand(CreateOrderArg arg) : ICommand<OkResponse>
{
    public CreateOrderArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateOrderCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateOrderCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Order> orderRepos,
    IRepository<OrderDetail> orderDetailRepos,
    IRepository<Agency> agencyRepos,
    IRepository<Product> prodRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<CreateOrderCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;
        var warehouseId = identifierProvider.WarehouseId;

        var checkAgency = await agencyRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.AgencyId && x.DeletedOn == null, cancellationToken);
        if (checkAgency is null)
            return CTBaseResult.NotFound("Đại lý");

        // Calculate subtotal by fetching unit prices for each product
        decimal subTotal = 0;
        foreach (var item in request.Arg.OrderDetails)
        {
            var product = await prodRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == item.ProductId && x.DeletedOn == null, cancellationToken);
            if (product is null)
                return CTBaseResult.NotFound("Mặt hàng");

            subTotal += item.Quantity * product.SellingPrice;
        }

        // Calculate total amount
        var vat = request.Arg.VAT ?? 0;
        var discount = request.Arg.Discount ?? 0;
        var discountAmount = subTotal * (discount / 100m);
        var vatAmount = (subTotal - discountAmount) * (vat / 100m);

        decimal totalAmount;
        if (request.Arg.IsRefund == false)
        {
            totalAmount = (subTotal - discountAmount) + vatAmount;
        }
        else
        {
            totalAmount = -((subTotal - discountAmount) + vatAmount);
        }

        var newOrder = new Order
        {
            WarehouseId = warehouseId is "null" ? warehouseId : request.Arg.WarehouseId,
            Code = CodeGenerationUtils.GenerateCodeFromName(checkAgency.Name),
            UserId = userId,
            AgencyId = request.Arg.AgencyId,
            IsRefund = request.Arg.IsRefund,
            VAT = vat,
            Discount = discount,
            TotalAmount = totalAmount
        };
        orderRepos.Add(newOrder);

        foreach (var item in request.Arg.OrderDetails)
        {
            var checkProduct = await prodRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == item.ProductId && x.DeletedOn == null, cancellationToken);
            if (checkProduct is null)
                return CTBaseResult.NotFound("Mặt hàng");

            var orderDetail = new OrderDetail
            {
                OrderId = newOrder.Id,
                ProductId = item.ProductId,
                Quantity = item.Quantity,
                UnitPrice = checkProduct.SellingPrice
            };
            orderDetailRepos.Add(orderDetail);
        }

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateOrderCommandValidator : AbstractValidator<CreateOrderCommand>
{
    public CreateOrderCommandValidator()
    {
        RuleFor(x => x.Arg.AgencyId)
            .NotEmpty()
            .WithMessage("Id của đại lý là bắt buộc.");
        RuleForEach(x => x.Arg.OrderDetails)
            .ChildRules(details =>
            {
                details.RuleFor(x => x.ProductId)
                    .NotEmpty()
                    .WithMessage("Id của mặt hàng là bắt buộc.");
                details.RuleFor(x => x.Quantity)
                    .NotEmpty()
                    .WithMessage("Số lượng là bắt buộc.")
                    .GreaterThan(0)
                    .WithMessage("Số lượng phải lớn hơn 0.");
            });
    }
}
