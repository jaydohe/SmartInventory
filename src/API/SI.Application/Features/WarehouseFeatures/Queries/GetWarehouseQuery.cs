using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.WarehouseContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;

namespace SI.Application.Features.WarehouseFeatures.Queries;

public class GetWarehouseQuery(string id) : IQuery<OkDynamicResponse>
{
    public string Id { get; set; } = id;
}

public class GetWarehouseQueryHandler(
    IRepository<Warehouse> warehouseRepos,
    IUserIdentifierProvider identifierProvider,
    IMapper mapper) : IQueryHandler<GetWarehouseQuery, OkDynamicResponse>
{
    public async Task<CTBaseResult<OkDynamicResponse>> Handle(GetWarehouseQuery request, CancellationToken cancellationToken)
    {
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        if (role is "WAREHOUSE_STAFF")
        {
            var checkManager = await warehouseRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.ManagerId == employeeId, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.UnProcess("Just manager can access.");
        }

        var warehouse = await warehouseRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
        if (warehouse is null)
            return CTBaseResult.NotFound("Warehouse");

        return CTBaseResult.Success(MapToResult(warehouse, request.Id));
    }

    private GetWarehouseResult MapToResult(Warehouse warehouse, string id)
    {
        return new GetWarehouseResult
        {
            Id = id,
            WarehouseId = warehouse.WarehouseId,
            ManagerId = warehouse.ManagerId,
            WardId = warehouse.WardId ?? string.Empty,
            DistrictId = warehouse.DistrictId ?? string.Empty,
            ProvinceId = warehouse.ProvinceId ?? string.Empty,
            CategoryId = warehouse.CategoryId,
            Code = warehouse.Code ?? string.Empty,
            Name = warehouse.Name ?? string.Empty,
            Address = warehouse.Address ?? string.Empty,
            Capacity = warehouse.Capacity,
            CreateAt = warehouse.CreatedAt,
            ModifiedOn = warehouse.ModifiedOn
        };
    }
}