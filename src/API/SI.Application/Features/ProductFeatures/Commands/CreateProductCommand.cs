using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.ProductContract;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.ProductFeatures.Commands;

public class CreateProductCommand(CreateProductArg arg) : ICommand<OkResponse>
{
    public CreateProductArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateProductCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateProductCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Product> productRepos,
    IRepository<MaterialSupplier> supplierRepos,
    IRepository<Category> categoryRepos,
    IRepository<Warehouse> warehouseRepos) : ICommandHandler<CreateProductCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        if (request.Arg.ProductType != ProductTypes.GOODS && 
            request.Arg.ProductType != ProductTypes.RAW_MATERIAL &&
            request.Arg.ProductType != ProductTypes.SEMI_FINISHED_PRODUCT &&
            request.Arg.ProductType != ProductTypes.FINISHED_PRODUCT)
            return CTBaseResult.NotFound("Product Type");

        var checkExisted = await productRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null && checkExisted.CategoryId == request.Arg.CategoryId && checkExisted.WarehouseId == request.Arg.WarehouseId)
            return CTBaseResult.UnProcess("Product already exists.");

        if (request.Arg.MaterialSupplierId != null)
        {
            var checkMaterialSupplier = await supplierRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.MaterialSupplierId && x.DeletedOn == null, cancellationToken);
            if (checkMaterialSupplier is null)
                return CTBaseResult.NotFound("Material Supplier");

            if (request.Arg.ProductType != ProductTypes.RAW_MATERIAL)
                return CTBaseResult.UnProcess("Product Type must be RAW MATERIAL.");
        }

        if (request.Arg.ProductType == ProductTypes.RAW_MATERIAL && request.Arg.MaterialSupplierId == null)
            return CTBaseResult.UnProcess("Product Type must not be RAW MATERIAL.");

        var checkWarehouse = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.WarehouseId && x.DeletedOn == null, cancellationToken);
        if (checkWarehouse is null)
            return CTBaseResult.NotFound("Warehouse");

        var checkCategory = await categoryRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.CategoryId && x.DeletedOn == null, cancellationToken);
        if (checkCategory is null)
            return CTBaseResult.NotFound("Category");
        if (checkCategory.CategoryEntityType != CategoryEntityTypes.PRODUCT)
            return CTBaseResult.UnProcess("Category must be product type.");

        var newProduct = new Product
        {
            MaterialSupplierId = request.Arg.MaterialSupplierId,
            WarehouseId = request.Arg.WarehouseId,
            CategoryId = request.Arg.CategoryId,
            Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name),
            Name = request.Arg.Name,
            Description = request.Arg.Description,
            Unit = request.Arg.Unit,
            ProductType = request.Arg.ProductType,
            PurchasePrice = request.Arg.PurchasePrice,
            SellingPrice = request.Arg.SellingPrice,
            HoldingCost = request.Arg.HoldingCost
        };
        productRepos.Add(newProduct);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateProductCommandValidator : AbstractValidator<CreateProductCommand>
{
    public CreateProductCommandValidator()
    {
        RuleFor(x => x.Arg.WarehouseId)
            .NotEmpty()
            .WithMessage("WarehouseId is required.");
        RuleFor(x => x.Arg.CategoryId)
            .NotEmpty()
            .WithMessage("CategoryId is required.");
        RuleFor(x => x.Arg.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(1024)
            .WithMessage("Name is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Description)
            .NotEmpty()
            .WithMessage("Description is required.")
            .MaximumLength(1024)
            .WithMessage("Description is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Unit)
            .NotEmpty()
            .WithMessage("Unit is required.")
            .MaximumLength(512)
            .WithMessage("Unit is too long. Only up to 512 characters.");
        RuleFor(x => x.Arg.ProductType)
            .NotEmpty()
            .WithMessage("ProductType is required.");
        RuleFor(x => x.Arg.PurchasePrice)
            .GreaterThan(0)
            .WithMessage("PurchasePrice must be greater than 0.");
        RuleFor(x => x.Arg.SellingPrice)
            .GreaterThan(0)
            .WithMessage("SellingPrice must be greater than 0.");
        RuleFor(x => x.Arg.HoldingCost)
            .GreaterThanOrEqualTo(0)
            .WithMessage("HoldingCost must be greater than or equal to 0.");
    }
}