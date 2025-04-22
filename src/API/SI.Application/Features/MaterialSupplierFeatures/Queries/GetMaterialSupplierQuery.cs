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

namespace SI.Application.Features.MaterialSupplierFeatures.Queries;

public class GetMaterialSupplierQuery(string id, QueryRequestV3 query)
    : CTBaseQuery<string, QueryRequestV3, OkDynamicResponse>(id, query)
{ }

public class GetMaterialSupplierQueryHandler(
    IRepository<MaterialSupplier> materialSupplierRepos,
    IMapper mapper) : IQueryHandler<GetMaterialSupplierQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetMaterialSupplierQuery request, CancellationToken cancellationToken)
    {
        var materialSupplier = await materialSupplierRepos.HandleLinqQueryRequestV2(request.QueryContext)
            .Where(e => e.Id == request.Id)
            .ProjectDynamic<MaterialSupplier>(mapper,
                new PopulateDescriptor(request.QueryContext.Populate),
                request.QueryContext.ToCacheKey())
            .FirstOrDefaultAsync(cancellationToken);
        if (materialSupplier is null)
            return CTBaseResult.NotFound("Material Supplier");

        return CTBaseResult.Success(materialSupplier);
    }
}