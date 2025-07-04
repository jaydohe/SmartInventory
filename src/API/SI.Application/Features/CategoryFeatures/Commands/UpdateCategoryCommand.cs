﻿using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.CategoryContract;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;

namespace SI.Application.Features.CategoryFeatures.Commands;

public class UpdateCategoryCommand(string id, UpdateCategoryArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateCategoryArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateCategoryCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateCategoryCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Category> categoryRepos) : ICommandHandler<UpdateCategoryCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        if (request.Arg.Name != null && request.Arg.Name.Trim() == "")
            return CTBaseResult.UnProcess("Tên danh mục không được chỉ bao gồm khoảng trắng.");

        var checkCategory = await categoryRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkCategory is null)
            return CTBaseResult.NotFound("Danh mục");
        if (checkCategory.Name == request.Arg.Name)
            return CTBaseResult.UnProcess("Tên danh mục không có thay đổi.");

        var checkExisted = await categoryRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.CategoryEntityType == checkCategory.CategoryEntityType && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null)
            return CTBaseResult.UnProcess($"Danh mục đã tồn tại.");

        if (request.Arg.Name != null)
        {
            checkCategory.Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name) ?? checkCategory.Code;
        }
        checkCategory.Name = request.Arg.Name ?? checkCategory.Name;
        checkCategory.ModifiedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
{
    public UpdateCategoryCommandValidator()
    {
        RuleFor(e => e.Arg.Name)
            .MaximumLength(512)
            .WithMessage("Tên danh mục tối đa 512 ký tự.");
    }
}