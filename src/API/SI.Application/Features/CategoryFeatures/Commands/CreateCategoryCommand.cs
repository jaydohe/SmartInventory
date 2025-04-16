using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.CategoryContract;
using SI.Domain.Entities;
using FluentValidation;
using SI.Domain.Enums;
using SI.Domain.Common.Utils;

namespace SI.Application.Features.CategoryFeatures.Commands;

public class CreateCategoryCommand(CreateCategoryArg arg) : ICommand<OkResponse>
{
    public CreateCategoryArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateCategoryCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateCategoryCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Category> categoryRepos) : ICommandHandler<CreateCategoryCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        if (request.Arg.CategoryEntityType != CategoryEntityTypes.PRODUCT &&
            request.Arg.CategoryEntityType != CategoryEntityTypes.WAREHOUSE &&
            request.Arg.CategoryEntityType != CategoryEntityTypes.POSITION)
            return CTBaseResult.NotFound("Category Entity Type");

        var checkCategory = await categoryRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.CategoryEntityType == request.Arg.CategoryEntityType && x.DeletedOn == null, cancellationToken);
        if (checkCategory?.Code != null)
            return CTBaseResult.UnProcess($"Category in {request.Arg.CategoryEntityType} is existed.");

        var newCategory = new Category
        {
            Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name),
            Name = request.Arg.Name,
            CategoryEntityType = request.Arg.CategoryEntityType
        };
        categoryRepos.Add(newCategory);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{
    public CreateCategoryCommandValidator()
    {
        RuleFor(e => e.Arg.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(512)
            .WithMessage("Name maximum 512 characters.");
        RuleFor(e => e.Arg.CategoryEntityType)
            .NotEmpty()
            .WithMessage("CategoryEntityType is required.");
    }
}