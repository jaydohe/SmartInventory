using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using CTCore.DynamicQuery.Population.Public.Descriptors;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities.GoodsIssues;

namespace SI.Application.Features.GoodsIssueFeatures.Queries;

public class GetGoodsIssueQuery(string id, QueryRequestV3 query)
    : CTBaseQuery<string, QueryRequestV3, OkDynamicResponse>(id, query)
{ }

public class GetGoodsIssueQueryHandler(
    IRepository<GoodsIssue> goodsIssueRepos,
    IMapper mapper) : IQueryHandler<GetGoodsIssueQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetGoodsIssueQuery request, CancellationToken cancellationToken)
    {
        QueryRequestV3 queryContext = request.QueryContext;
        var goodsIssue = await goodsIssueRepos.HandleLinqQueryRequestV2(queryContext)
            .Where(e => e.Id == request.Id)
            .ProjectDynamic<GoodsIssue>(mapper,
                new PopulateDescriptor(queryContext.Populate),
                queryContext.ToCacheKey())
            .FirstOrDefaultAsync(cancellationToken);
        if (goodsIssue is null)
            return CTBaseResult.NotFound("Goods Issue");

        return CTBaseResult.Success(goodsIssue);
    }
}