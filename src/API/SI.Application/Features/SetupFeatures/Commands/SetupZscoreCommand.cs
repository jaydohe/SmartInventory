using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SetupContract;
using SI.Domain.Entities;

namespace SI.Application.Features.SetupFeatures.Commands;

public class SetupZscoreCommand(SetupZscoreArg arg) : ICommand<OkResponse>
{
    public SetupZscoreArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        SetupZscoreCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class SetupZscoreCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Setup> zscoreRepos) : ICommandHandler<SetupZscoreCommand, OkResponse>
 {
    public async Task<CTBaseResult<OkResponse>> Handle(SetupZscoreCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkZscore = await zscoreRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.DeletedOn == null, cancellationToken);
        if (checkZscore is null)
        {
            var newZscore = new Setup
            {
                ZScore = request.Arg.ZScore,
            };
            zscoreRepos.Add(newZscore);
        }
        else
        {
            checkZscore.ZScore = request.Arg.ZScore;
            checkZscore.ModifiedOn = DateTimeOffset.UtcNow;
        }

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class SetupZscoreCommandValidator : AbstractValidator<SetupZscoreCommand>
{
    public SetupZscoreCommandValidator()
    {
        RuleFor(x => x.Arg.ZScore) 
            .NotNull()
            .WithMessage("ZScore is required.")
            .InclusiveBetween(-6, 6)
            .WithMessage("ZScore must be between -6 and 6.");
    }
}