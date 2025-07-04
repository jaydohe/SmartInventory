﻿using CTCore.DynamicQuery.Core.Domain.Interfaces;
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
    IRepository<Position> positionRepos,
    IUserIdentifierProvider userIdentifier) 
        : IQueryHandler<GetMeQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetMeQuery request, CancellationToken cancellationToken)
    {
        var userId = userIdentifier.UserId;
        var warehouseId = userIdentifier.WarehouseId;
        var positionId = userIdentifier.PositionId;

        var getUserId = await userRepos.BuildQuery
            .FirstOrDefaultAsync(e => e.Id == userId, cancellationToken);
        if (getUserId is null)
            return CTBaseResult.NotFound($"Người dùng {userId}");

        var getWareName = await wareRepos.BuildQuery
            .Where(e => e.Id == warehouseId)
            .Select(e => e.Name)
            .FirstOrDefaultAsync(cancellationToken);

        var getEmployee = await employeeRepos.BuildQuery
            .Include(e => e.Department)
            .FirstOrDefaultAsync(e => e.Id == getUserId.EmployeeId, cancellationToken);

        var positionName = await positionRepos.BuildQuery
            .Where(e => e.Id == positionId)
            .Select(e => e.Name)
            .FirstOrDefaultAsync(cancellationToken);

        var result = new GetMeArg
        {
            PositionId = positionId,
            PositionName = positionName ?? "null",
            UserId = userId,
            Code = getEmployee?.Code ?? "null",
            Name = getUserId.Name,
            LoginName = getUserId.LoginName,
            WareId = warehouseId,
            WareName = getWareName ?? "null",
            DepartmentId = getEmployee?.DepartmentId ?? "null",
            DepartmentName = getEmployee?.Department?.Name ?? "null",
            Gender = getEmployee?.GenderType ?? "null",
            IsManager = getEmployee?.IsManager,
            PhoneNumber = getEmployee?.PhoneNumber ?? "null",
            Email = getEmployee?.Email ?? "null",
            Address = getEmployee?.Address ?? "null",
            DateHired = getEmployee?.DateHired.ToString() ?? "null"
        };

        return CTBaseResult.Success(result);
    }
}
