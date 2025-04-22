using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using CTCore.DynamicQuery.Population;
using Microsoft.EntityFrameworkCore;
using SI.Contract.UserContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.UserFeatures.Queries;

public class GetAllUserQuery(QueryPageRequestV3 query)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicPageResponse>(query)
{
}

public class GetAllUserQueryHandler(
    IRepository<User> userRepos,
    IMapper mapper,
    IUserIdentifierProvider identifierProvider) : IQueryHandler<GetAllUserQuery, OkDynamicPageResponse>
{
    public async Task<CTBaseResult<OkDynamicPageResponse>> Handle(GetAllUserQuery request, CancellationToken cancellationToken)
    {
        var role = identifierProvider.Role;

        var queryContext = request.QueryContext;
        var userQuery = userRepos.HandleLinqQueryRequestV2(request.QueryContext);
        if (role is "ADMIN")
        {
            userQuery = userQuery
                .Where(x => x.Role != UserRoles.DEV)
                .Where(x => x.DeletedOn == null);
        }

        var (executeQuery, totalRecords, totalPages) =
            userQuery.HandleLinqQueryPageRequestV2(
            queryContext,
            queryContext.IsAscending,
            queryContext.OrderBy);

        if (queryContext.Populate.Any(e => e.Count(s => s == '.') >= 3))
            executeQuery = userQuery.AsSplitQuery();

        var data = await executeQuery.ProjectDynamic<UserDTO>
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