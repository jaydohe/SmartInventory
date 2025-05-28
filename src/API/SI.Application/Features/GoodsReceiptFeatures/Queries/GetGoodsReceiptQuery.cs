using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using CTCore.DynamicQuery.Population.Public.Descriptors;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities.GoodsReceipts;

namespace SI.Application.Features.GoodsReceiptFeatures.Queries;

public class GetGoodsReceiptQuery(string id, QueryRequestV3 query)
    : CTBaseQuery<string, QueryRequestV3, OkDynamicResponse>(id, query)
{ }

public class GetGoodsReceiptQueryHandler(
    IRepository<GoodsReceipt> goodsReceiptRepos,
    IMapper mapper) : IQueryHandler<GetGoodsReceiptQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetGoodsReceiptQuery request, CancellationToken cancellationToken)
    {
        QueryRequestV3 queryContext = request.QueryContext;
        var goodsReceipt = await goodsReceiptRepos.HandleLinqQueryRequestV2(queryContext)
            .Where(e => e.Id == request.Id)
            .ProjectDynamic<GoodsReceipt>(mapper,
                new PopulateDescriptor(queryContext.Populate),
                queryContext.ToCacheKey())
            .FirstOrDefaultAsync(cancellationToken);
        if (goodsReceipt is null)
            return CTBaseResult.NotFound("Phiếu nhập hàng");

        return CTBaseResult.Success(goodsReceipt);
    }
}