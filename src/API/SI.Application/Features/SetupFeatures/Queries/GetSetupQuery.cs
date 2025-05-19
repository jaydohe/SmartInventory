using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SetupContract;
using SI.Domain.Entities;

namespace SI.Application.Features.SetupFeatures.Queries;

public class GetSetupQuery : IQuery<SetupDetailResponse>
{
}

public class GetZscoreQueryHandler(
    IRepository<Setup> setupRepos) : IQueryHandler<GetSetupQuery, SetupDetailResponse>
{
    public async Task<CTBaseResult<SetupDetailResponse>> Handle(GetSetupQuery request, CancellationToken cancellationToken)
    {
        var zscore = await setupRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.DeletedOn == null, cancellationToken);
        if (zscore is null)
            return CTBaseResult.NotFound("ZScore/Min stock level configuration");

        return new SetupDetailResponse()
        {
            ZScore = zscore.ZScore,
            MinStockLevel = zscore.MinStockLevel,
            CreatedAt = zscore.CreatedAt,
            ModifiedOn = zscore.ModifiedOn
        };
    }
}