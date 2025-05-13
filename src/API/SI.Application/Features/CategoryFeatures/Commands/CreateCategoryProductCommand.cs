using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.CategoryContract;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.CategoryFeatures.Commands;

public class CreateCategoryProductCommand(CreateCategoryArg arg) : ICommand<OkResponse>
{
    public CreateCategoryArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateCategoryProductCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateCategoryProductCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Category> categoryRepos) : ICommandHandler<CreateCategoryProductCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateCategoryProductCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkCategory = await categoryRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.CategoryEntityType == CategoryEntityTypes.PRODUCT && x.DeletedOn == null, cancellationToken);
        if (checkCategory != null)
            return CTBaseResult.UnProcess($"Category is existed.");

        var newCategory = new Category
        {
            Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name),
            Name = request.Arg.Name,
            CategoryEntityType = CategoryEntityTypes.PRODUCT
        };
        categoryRepos.Add(newCategory);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));
        
        return CTBaseResult.Success();
    }
}

public class CreateCategoryProductCommandValidator : AbstractValidator<CreateCategoryProductCommand>
{
    public CreateCategoryProductCommandValidator()
    {
        RuleFor(e => e.Arg.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(512)
            .WithMessage("Name is too long. Only up to 512 characters.");
    }
}