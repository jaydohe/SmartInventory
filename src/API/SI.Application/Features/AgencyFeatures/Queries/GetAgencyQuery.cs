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

namespace SI.Application.Features.AgencyFeatures.Queries;

public class GetAgencyQuery(string id, QueryRequestV3 query)
    : CTBaseQuery<string, QueryRequestV3, OkDynamicResponse>(id, query)
{ }

public class GetAgencyQueryHandler(
    IRepository<Agency> agencyRepos,
    IMapper mapper) : IQueryHandler<GetAgencyQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetAgencyQuery request, CancellationToken cancellationToken)
    {
        var agency = await agencyRepos.HandleLinqQueryRequestV2(request.QueryContext)
            .Where(e => e.Id == request.Id)
            .ProjectDynamic<Agency>(mapper,
                new PopulateDescriptor(request.QueryContext.Populate),
                request.QueryContext.ToCacheKey())
            .FirstOrDefaultAsync(cancellationToken);
        if (agency is null)
            return CTBaseResult.NotFound("Agency");

        return CTBaseResult.Success(agency);
    }
}