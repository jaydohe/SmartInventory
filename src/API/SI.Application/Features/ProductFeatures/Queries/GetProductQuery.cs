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

namespace SI.Application.Features.ProductFeatures.Queries;

public class GetProductQuery(string id, QueryRequestV3 query)
    : CTBaseQuery<string, QueryRequestV3, OkDynamicResponse>(id, query)
{
}

public class GetProductQueryHandler(
    IRepository<Product> productRepos,
    IRepository<Employee> employeeRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetProductQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetProductQuery request, CancellationToken cancellationToken)
    {
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        if (role is "WAREHOUSE_STAFF")
        {
            var checkManager = await employeeRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId && x.IsManager == true, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.UnProcess("Just manager can access.");
        }

        QueryRequestV3 queryContext = request.QueryContext;
        var product = await productRepos.HandleLinqQueryRequestV2(queryContext)
            .Where(e => e.Id == request.Id)
            .ProjectDynamic<Product>(mapper,
                new PopulateDescriptor(queryContext.Populate),
                queryContext.ToCacheKey())
            .FirstOrDefaultAsync(cancellationToken);
        if (product is null)
            return CTBaseResult.NotFound("Product");

        return CTBaseResult.Success(product);
    }
}