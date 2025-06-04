using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.PositionContract;
using SI.Domain.Entities;

namespace SI.Application.Features.PositionFeatures.Commands;

public class CreatePositionCommand(PositionArg arg) : ICommand<OkResponse>
{
    public PositionArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreatePositionCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreatePositionCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Position> positionRepos) : ICommandHandler<CreatePositionCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreatePositionCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkPosition = await positionRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkPosition != null)
            return CTBaseResult.UnProcess("Chức vụ đã tồn tại.");

        var newPosition = new Position
        {
            Name = request.Arg.Name
        };
        positionRepos.Add(newPosition);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreatePositionCommandValidator : AbstractValidator<CreatePositionCommand>
{
    public CreatePositionCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .NotEmpty()
            .WithMessage("Tên chức vụ là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Tên chức vụ tối đa 1024 ký tự.");
    }
}