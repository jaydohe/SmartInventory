using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.ProductContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.ProductFeatures.Commands;

public class UpdateProductCommand(string id, UpdateProductArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateProductArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateProductCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateProductCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Product> productRepos,
    IRepository<Category> categoryRepos,
    IRepository<Employee> employeeRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<UpdateProductCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        if (role is "WAREHOUSE_STAFF")
        {
            var checkManager = await employeeRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId && x.IsManager == true, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.UnProcess("Just manager can access.");
        }

        if (request.Arg.Name != null && request.Arg.Name.Trim() == "")
            return CTBaseResult.UnProcess("Name cannot consist only of whitespace.");
        if (request.Arg.Description != null && request.Arg.Description.Trim() == "")
            return CTBaseResult.UnProcess("Description cannot consist only of whitespace.");
        if (request.Arg.Unit != null && request.Arg.Unit.Trim() == "")
            return CTBaseResult.UnProcess("Unit cannot consist only of whitespace.");

        var checkProduct = await productRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkProduct is null)
            return CTBaseResult.NotFound("Product");

        var checkExisted = await productRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null && checkExisted.CategoryId == checkProduct.CategoryId && checkExisted.WarehouseId == checkProduct.WarehouseId)
            return CTBaseResult.UnProcess("Product already exists.");

        if (request.Arg.CategoryId != null)
        {
            var checkCategory = await categoryRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Arg.CategoryId && x.DeletedOn == null, cancellationToken);
            if (checkCategory is null)
                return CTBaseResult.NotFound("Category");
            if (checkCategory.CategoryEntityType != CategoryEntityTypes.PRODUCT)
                return CTBaseResult.UnProcess("Category must be product type.");
        }

        if (request.Arg.Name != null)
        {
            checkProduct.Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name);
        }
        checkProduct.Name = request.Arg.Name ?? checkProduct.Name;
        checkProduct.Description = request.Arg.Description ?? checkProduct.Description;
        checkProduct.Unit = request.Arg.Unit ?? checkProduct.Unit;
        checkProduct.PurchasePrice = request.Arg.PurchasePrice ?? checkProduct.PurchasePrice;
        checkProduct.SellingPrice = request.Arg.SellingPrice ?? checkProduct.SellingPrice;
        checkProduct.HoldingCost = request.Arg.HoldingCost ?? checkProduct.HoldingCost;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateProductCommandValidator : AbstractValidator<UpdateProductCommand>
{
    public UpdateProductCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .MaximumLength(1024)
            .WithMessage("Name is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Description)
            .MaximumLength(1024)
            .WithMessage("Description is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Unit)
            .MaximumLength(512)
            .WithMessage("Unit is too long. Only up to 512 characters.");
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