using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using CTCore.DynamicQuery.Population.Public.Descriptors;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;

namespace SI.Application.Features.CategoryFeatures.Queries;

public class GetCategoryQuery(string id, QueryRequestV3 query)
    : CTBaseQuery<string, QueryRequestV3, OkDynamicResponse>(id, query)
{ }

public class GetCategoryQueryHandler(
    IRepository<Category> categoryRepos,
    IMapper mapper) : IQueryHandler<GetCategoryQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetCategoryQuery request, CancellationToken cancellationToken)
    {
        QueryRequestV3 queryContext = request.QueryContext;
        var category = await categoryRepos.HandleLinqQueryRequestV2(queryContext)
            .Where(e => e.Id == request.Id)
            .ProjectDynamic<Category>(mapper,
                new PopulateDescriptor(queryContext.Populate),
                queryContext.ToCacheKey())
            .FirstOrDefaultAsync(cancellationToken);
        if (category is null)
            return CTBaseResult.NotFound("Category");

        return CTBaseResult.Success(category);
    }
}
