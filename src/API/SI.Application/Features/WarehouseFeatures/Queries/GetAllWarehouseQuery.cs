using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Primitives;
using SI.Domain.Entities;

namespace SI.Application.Features.WarehouseFeatures.Queries;

public class GetAllWarehouseQuery(QueryPageRequestV3 request)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(request)
{
}

public class GetAllWarehouseQueryHandler(
    IRepository<Warehouse> repository,
    IMapper mapper) : PageQueryHandler<GetAllWarehouseQuery, Warehouse>(repository, mapper)
{
}
