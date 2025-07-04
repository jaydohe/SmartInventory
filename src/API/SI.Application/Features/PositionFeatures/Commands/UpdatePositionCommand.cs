﻿using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.PositionContract;
using SI.Domain.Entities;

namespace SI.Application.Features.PositionFeatures.Commands;

public class UpdatePositionCommand(string id, PositionArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public PositionArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdatePositionCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdatePositionCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Position> positionRepos) : ICommandHandler<UpdatePositionCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdatePositionCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        if (request.Arg.Name != null && request.Arg.Name.Trim() == "")
            return CTBaseResult.UnProcess("Tên chức vụ không được chỉ bao gồm khoảng trắng.");

        var checkPosition = await positionRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkPosition is null)
            return CTBaseResult.NotFound("Chức vụ");
        if (checkPosition.Name == request.Arg.Name)
            return CTBaseResult.UnProcess("Tên chức vụ không có gì thay đổi.");

        var checkExisted = await positionRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null)
            return CTBaseResult.UnProcess($"Chức vụ đã tồn tại.");

        checkPosition.Name = request.Arg.Name ?? checkPosition.Name;
        checkPosition.ModifiedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdatePositionCommandValidator : AbstractValidator<UpdatePositionCommand>
{
    public UpdatePositionCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .MaximumLength(1024)
            .WithMessage("Tên chức vụ tối đa 1024 ký tự.");
    }
}