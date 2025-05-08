using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Extension;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.NotificationFeatures.Queries;

public class CountNotificationQuery(QueryPageRequestV3 request)
    : CTBaseQuery<QueryPageRequestV3, OkDynamicResponse>(request)
{
}

public class CountNotificationQueryHandler
    (
        IRepository<Notification> notiRepos,
        IUserIdentifierProvider identifierProvider
    )
    : IQueryHandler<CountNotificationQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(CountNotificationQuery request, CancellationToken cancellationToken)
    {
        var userId = identifierProvider.UserId;
        var queryContext = request.QueryContext;
        var notifications = notiRepos.HandleLinqQueryRequestV2(queryContext)
                                     .Where(e => e.UserId == userId);

        var (executeQuery, totalRecords, totalPages) =
            notifications.HandleLinqQueryPageRequestV2(
            queryContext,
            queryContext.IsAscending,
            queryContext.OrderBy);
        
        int count = await executeQuery.Where(e => !e.IsMarked).CountAsync(cancellationToken);

        return CTBaseResult.Success(count);
    }
}