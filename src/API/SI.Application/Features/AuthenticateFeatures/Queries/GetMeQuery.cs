using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Abstraction;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.AuthenticateContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.AuthenticateFeatures.Queries;

public class GetMeQuery(QueryRequestV3 query)
    : CTBaseQuery<QueryRequestV3, OkDynamicResponse>(query)
{
}

public class GetMeQueryHandler(
    IRepository<User> userRepos,
    IRepository<Warehouse> wareRepos,
    IRepository<Employee> employeeRepos,
    IUserIdentifierProvider userIdentifier) 
        : IQueryHandler<GetMeQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetMeQuery request, CancellationToken cancellationToken)
    {
        var userId = userIdentifier.UserId;
        var wareId = userIdentifier.WareId;

        var getUserId = await userRepos.BuildQuery
            .FirstOrDefaultAsync(e => e.Id == userId, cancellationToken);
        if (getUserId is null)
            return CTBaseResult.NotFound($"User {userId}");

        var getWareName = await wareRepos.BuildQuery
            .Where(e => e.Id == wareId)
            .Select(e => e.Name)
            .FirstOrDefaultAsync(cancellationToken);

        var getEmployee = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(e => e.Id == getUserId.EmployeeId, cancellationToken);

        var result = new GetMeArg
        {
            UserId = userId,
            Name = getUserId.Name,
            LoginName = getUserId.LoginName,
            WareName = getWareName ?? "null",
            DepartmentName = getEmployee?.Department?.Name ?? "null",
            Gender = getEmployee.IsMale ? "Male" : "Female",
            PhoneNumber = getEmployee?.PhoneNumber ?? "null",
            Email = getEmployee?.Email ?? "null",
            Address = getEmployee?.Address ?? "null",
            Position = getEmployee?.Position ?? "null",
            DateHired = getEmployee?.DateHired.ToString() ?? "null"
        };

        return CTBaseResult.Success(result);
    }
}
