using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.SetupContract;
using SI.Domain.Entities;

namespace SI.Application.Features.SetupFeatures.Queries;

public class GetZscoreQuery : IQuery<ZScoreDetailResponse>
{
}

public class GetZscoreQueryHandler(
    IRepository<Setup> zscoreRepos) : IQueryHandler<GetZscoreQuery, ZScoreDetailResponse>
{
    public async Task<CTBaseResult<ZScoreDetailResponse>> Handle(GetZscoreQuery request, CancellationToken cancellationToken)
    {
        var zscore = await zscoreRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.DeletedOn == null, cancellationToken);
        if (zscore is null)
            return CTBaseResult.NotFound("ZScore configuration not found.");

        return new ZScoreDetailResponse()
        {
            ZScore = zscore.ZScore,
            CreatedAt = zscore.CreatedAt,
            ModifiedOn = zscore.ModifiedOn
        };
    }
}