using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Primitives;
using SI.Domain.Entities;

namespace SI.Application.Features.AgencyFeatures.Queries;

public class GetAllAgencyQuery(QueryPageRequestV3 request)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(request)
{ }

public class GetAllAgencyQueryHandler(
    IRepository<Agency> repository,
    IMapper mapper) : PageQueryHandler<GetAllAgencyQuery, Agency>(repository, mapper)
{ }