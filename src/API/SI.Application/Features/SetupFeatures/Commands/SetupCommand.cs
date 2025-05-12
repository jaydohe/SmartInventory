using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SetupContract;
using SI.Domain.Entities;

namespace SI.Application.Features.SetupFeatures.Commands;

public class SetupCommand(SetupArg arg) : ICommand<OkResponse>
{
    public SetupArg Arg { get; set; } = arg;
}

public class SetupCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Setup> zscoreRepos) : ICommandHandler<SetupCommand, OkResponse>
 {
    public async Task<CTBaseResult<OkResponse>> Handle(SetupCommand request, CancellationToken cancellationToken)
    {
        var checkSetup = await zscoreRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.DeletedOn == null, cancellationToken);
        if (checkSetup is null)
        {
            var newZscore = new Setup
            {
                ZScore = request.Arg.ZScore ?? 0,
                MinStockLevel = request.Arg.MinStockLevel ?? 0,
            };
            zscoreRepos.Add(newZscore);
        }
        else
        {
            checkSetup.ZScore = request.Arg.ZScore ?? checkSetup.ZScore;
            checkSetup.MinStockLevel = request.Arg.MinStockLevel ?? checkSetup.MinStockLevel;
            checkSetup.ModifiedOn = DateTimeOffset.UtcNow;
        }

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}