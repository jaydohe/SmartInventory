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

public class CreateCategoryWarehouseCommand(CreateCategoryArg arg) : ICommand<OkResponse>
{
    public CreateCategoryArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateCategoryWarehouseCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateCategoryWarehouseCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Category> categoryRepos) : ICommandHandler<CreateCategoryWarehouseCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateCategoryWarehouseCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkCategory = await categoryRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.CategoryEntityType == CategoryEntityTypes.WAREHOUSE && x.DeletedOn == null, cancellationToken);
        if (checkCategory != null)
            return CTBaseResult.UnProcess($"Tên danh mục kho đã tồn tại.");

        var newCategory = new Category
        {
            Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name),
            Name = request.Arg.Name,
            CategoryEntityType = CategoryEntityTypes.WAREHOUSE
        };
        categoryRepos.Add(newCategory);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateCategoryWarehouseCommandValidator : AbstractValidator<CreateCategoryWarehouseCommand>
{
    public CreateCategoryWarehouseCommandValidator()
    {
        RuleFor(e => e.Arg.Name)
            .NotEmpty()
            .WithMessage("Tên danh mục là bắt buộc.")
            .MaximumLength(512)
            .WithMessage("Tên danh mục tối đa 512 ký tự.");
    }
}