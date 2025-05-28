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
    IRepository<Category> categoryRepos) : ICommandHandler<CreateProductCommand, OkResponse>
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
            return CTBaseResult.NotFound("Loại hàng hóa");

        var checkExisted = await productRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null && checkExisted.CategoryId == request.Arg.CategoryId)
            return CTBaseResult.UnProcess("Tên hàng hóa đã tồn tại.");

        if (request.Arg.MaterialSupplierId != null)
        {
            var checkMaterialSupplier = await supplierRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.MaterialSupplierId && x.DeletedOn == null, cancellationToken);
            if (checkMaterialSupplier is null)
                return CTBaseResult.NotFound("Nhà cung cấp NVL");

            if (request.Arg.ProductType != ProductTypes.RAW_MATERIAL)
                return CTBaseResult.UnProcess("Loại hàng hóa phải là nguyên vật liệu.");
        }

        if (request.Arg.ProductType == ProductTypes.RAW_MATERIAL && request.Arg.MaterialSupplierId == null)
            return CTBaseResult.UnProcess("Loại hàng hóa không phải là nguyên vật liệu.");

        var checkCategory = await categoryRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.CategoryId && x.DeletedOn == null, cancellationToken);
        if (checkCategory is null)
            return CTBaseResult.NotFound("Danh mục hàng hóa");
        if (checkCategory.CategoryEntityType != CategoryEntityTypes.PRODUCT)
            return CTBaseResult.UnProcess("Bắt buộc phải là danh mục hàng hóa.");

        var newProduct = new Product
        {
            MaterialSupplierId = request.Arg.MaterialSupplierId,
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
        RuleFor(x => x.Arg.CategoryId)
            .NotEmpty()
            .WithMessage("Id của danh mục hàng hóa là bắt buộc.");
        RuleFor(x => x.Arg.Name)
            .NotEmpty()
            .WithMessage("Tên hàng hóa là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Tên hàng hóa tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Description)
            .NotEmpty()
            .WithMessage("Mô tả là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Mô tả tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Unit)
            .NotEmpty()
            .WithMessage("Đơn vị là bắt buộc.")
            .MaximumLength(512)
            .WithMessage("Đơn vị tối đa 512 ký tự.");
        RuleFor(x => x.Arg.ProductType)
            .NotEmpty()
            .WithMessage("Loại hàng hóa là bắt buộc.");
        RuleFor(x => x.Arg.PurchasePrice)
            .GreaterThan(0)
            .WithMessage("Giá mua phải lớn hơn 0.");
        RuleFor(x => x.Arg.SellingPrice)
            .GreaterThan(0)
            .WithMessage("Giá bán phải lớn hơn 0.");
        RuleFor(x => x.Arg.HoldingCost)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Chi phí lưu kho phải lớn hơn hoặc bằng 0.");
    }
}