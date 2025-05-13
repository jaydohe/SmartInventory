using CTCore.DynamicQuery.Core.Domain.Interfaces;
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
            return CTBaseResult.UnProcess("Name cannot consist only of whitespace.");

        var checkPosition = await positionRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkPosition is null)
            return CTBaseResult.NotFound("Position");
        if (checkPosition.Name == request.Arg.Name)
            return CTBaseResult.UnProcess("Position name has not been changed.");

        var checkExisted = await positionRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null)
            return CTBaseResult.UnProcess($"Position name is existed.");

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
            .WithMessage("Name must be less than 1024 characters.");
    }
}