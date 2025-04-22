using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Primitives;
using SI.Domain.Entities;

namespace SI.Application.Features.MaterialSupplierFeatures.Queries;

public class GetAllMaterialSupplierQuery(QueryPageRequestV3 request)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(request)
{ }

public class GetAllMaterialSupplierQueryHandler(
    IRepository<MaterialSupplier> repository,
    IMapper mapper) : PageQueryHandler<GetAllMaterialSupplierQuery, MaterialSupplier>(repository, mapper)
{ }