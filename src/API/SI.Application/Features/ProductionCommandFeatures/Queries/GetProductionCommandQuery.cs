using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using CTCore.DynamicQuery.Population.Public.Descriptors;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;
using SI.Domain.Entities.ProductionCommands;

namespace SI.Application.Features.ProductionCommandFeatures.Queries;

public class GetProductionCommandQuery(string id, QueryRequestV3 query)
    : CTBaseQuery<string, QueryRequestV3, OkDynamicResponse>(id, query)
{ }

public class GetProductionCommandQueryHandler(
    IRepository<ProductionCommand> productionCommandRepos,
    IMapper mapper) : IQueryHandler<GetProductionCommandQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetProductionCommandQuery request, CancellationToken cancellationToken)
    {
        QueryRequestV3 queryContext = request.QueryContext;
        var productionCommand = await productionCommandRepos.HandleLinqQueryRequestV2(queryContext)
            .Where(e => e.Id == request.Id)
            .ProjectDynamic<ProductionCommand>(mapper,
                new PopulateDescriptor(queryContext.Populate),
                queryContext.ToCacheKey())
            .FirstOrDefaultAsync(cancellationToken);
        if (productionCommand is null)
            return CTBaseResult.NotFound("Production Command");

        return CTBaseResult.Success(productionCommand);
    }
}