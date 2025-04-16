using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Primitives;
using SI.Domain.Entities;

namespace SI.Application.Features.CategoryFeatures.Queries;

public class GetAllCategoryQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{ }

public class GetAllCategoryQueryHandler(
    IRepository<Category> repository,
    IMapper mapper) : PageQueryHandler<GetAllCategoryQuery, Category>(repository, mapper)
{
}
