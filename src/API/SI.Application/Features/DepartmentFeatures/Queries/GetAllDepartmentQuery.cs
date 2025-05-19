using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;

namespace SI.Application.Features.DepartmentFeatures.Queries;

public class GetAllDepartmentQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{
}

public class GetAllDepartmentQueryHandler(
    IRepository<Department> repository,
    IMapper mapper) : IQueryHandler<GetAllDepartmentQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllDepartmentQuery request, CancellationToken cancellationToken)
    {
        var queryContext = request.QueryContext;
        var departmentQuery = repository.HandleLinqQueryRequestV2(request.QueryContext);
        var (executeQuery, totalRecords, totalPages) =
            departmentQuery.HandleLinqQueryPageRequestV2(
            queryContext,
            queryContext.IsAscending,
            queryContext.OrderBy);
        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = departmentQuery.AsSplitQuery();

        var data = await executeQuery.ProjectDynamic<Department>
            (mapper, new(request.QueryContext.Populate), request.QueryContext.ToCacheKey())
            .ToArrayAsync(cancellationToken);

        var result = new OkDynamicPageResponse(
            data,
            totalRecords,
            totalPages,
            queryContext.Page,
            queryContext.Offset);

        return result;
    }
}