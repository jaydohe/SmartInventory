using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.ProductionCommandContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Entities.Orders;
using SI.Domain.Entities.ProductionCommands;
using SI.Domain.Enums;

namespace SI.Application.Features.ProductionCommandFeatures.Commands;

public class CreateProductionCommandCommand(CreateProductionCommandArg arg) : ICommand<OkResponse>
{
    public CreateProductionCommandArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateProductionCommandCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateProductionCommandCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<ProductionCommand> productionCommandRepos,
    IRepository<ProductionCommandDetail> productionCommandDetailRepos,
    IRepository<ProductionCommandProcess> productionCommandProcessRepos,
    IRepository<OrderDetail> orderDetailRepos,
    IRepository<Product> prodRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<CreateProductionCommandCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateProductionCommandCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;

        //Calculate subtotal by fetching unit prices for each product
        decimal totalAmount = 0;
        foreach (var item in request.Arg.ProductionCommandDetails)
        {
            var product = await prodRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == item.ProductId && x.DeletedOn == null, cancellationToken);
            if (product is null)
                return CTBaseResult.NotFound("Product");
            totalAmount += item.Quantity * product.PurchasePrice;
        }

        string name;
        if (request.Arg.OrderId != null)
            name = $"từ đơn hàng";
        else
            name = $"từ dự báo nhu cầu";

        var newProductionCommand = new ProductionCommand
        {
            OrderId = request.Arg.OrderId,
            UserId = userId,
            Code = CodeGenerationUtils.GenerateCodeFromName("Lệnh sản xuất" + name),
            Description = request.Arg.Description,
            PlannedStart = request.Arg.PlannedStart,
            PlannedEnd = request.Arg.PlannedEnd,
            TotalAmount = totalAmount,
            Status = CommandStatus.CREATED
        };
        productionCommandRepos.Add(newProductionCommand);

        foreach (var item in request.Arg.ProductionCommandDetails)
        {
            if (request.Arg.OrderId != null)
            {
                var checkOrderDetail = await orderDetailRepos.BuildQuery
                    .Include(x => x.Product)
                    .FirstOrDefaultAsync(x => x.OrderId == request.Arg.OrderId && x.ProductId == item.ProductId && x.DeletedOn == null, cancellationToken);
                if (checkOrderDetail is null)
                    return CTBaseResult.NotFound("OrderDetail");

                var newDetail = new ProductionCommandDetail
                {
                    ProductionCommandId = newProductionCommand.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = checkOrderDetail.Product.PurchasePrice,
                    TotalPrice = item.Quantity * checkOrderDetail.Product.SellingPrice
                };
                productionCommandDetailRepos.Add(newDetail);
            }
            else
            {
                var checkProduct = await prodRepos.BuildQuery
                    .FirstOrDefaultAsync(x => x.Id == item.ProductId && x.DeletedOn == null, cancellationToken);
                if (checkProduct is null)
                    return CTBaseResult.NotFound("Product");

                var newDetail = new ProductionCommandDetail
                {
                    ProductionCommandId = newProductionCommand.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    Price = checkProduct.SellingPrice,
                    TotalPrice = item.Quantity * checkProduct.PurchasePrice
                };
                productionCommandDetailRepos.Add(newDetail);
            }
        }

        var newProcess = new ProductionCommandProcess
        {
            ProductionCommandId = newProductionCommand.Id,
            Percentage = 0,
            Status = ProcessProductionStatus.PREPARATION
        };
        productionCommandProcessRepos.Add(newProcess);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateProductionCommandCommandValidator : AbstractValidator<CreateProductionCommandCommand>
{
    public CreateProductionCommandCommandValidator()
    {
        RuleFor(x => x.Arg.Description)
            .MaximumLength(1024)
            .WithMessage("Description is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.ProductionCommandDetails)
            .NotEmpty()
            .WithMessage("ProductionCommandDetails is required.");
        RuleForEach(x => x.Arg.ProductionCommandDetails)
            .NotEmpty()
            .WithMessage("Production CommandDetails is required.")
            .Must(x => !string.IsNullOrEmpty(x.ProductId))
            .WithMessage("ProductId is required.")
            .Must(x => x.Quantity > 0)
            .WithMessage("Quantity must be greater than 0.");
    }
}