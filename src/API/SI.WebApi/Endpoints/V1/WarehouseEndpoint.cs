using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.WarehouseFeatures.Commands;
using SI.Application.Features.WarehouseFeatures.Queries;
using SI.Contract.WarehouseContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class WarehouseEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var warehouseGR = endpoints
            .MapGroup($"{defaultPath}/warehouse")
            .WithDisplayName("Warehouse")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        warehouseGR.MapGet("/get-all", GetAllWarehouseAsync).RequireAuthorization(APIPolicies.STAFF_SALESMAN);
        warehouseGR.MapGet("/get-by-id/{id}", GetWarehouseAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        warehouseGR.MapPost("/create", CreateWarehouseAsync).RequireAuthorization(APIPolicies.ADMIN);
        warehouseGR.MapPatch("/update/{id}", UpdateWarehouseAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        warehouseGR.MapDelete("/delete/{id}", DelWarehouseAsync).RequireAuthorization(APIPolicies.ADMIN);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllWarehouseAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllWarehouseQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetWarehouseAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetWarehouseQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateWarehouseAsync(
        [FromServices] IMediator mediator, [FromBody] CreateWarehouseArg arg)
        => (await mediator.Send(new CreateWarehouseCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateWarehouseAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateWarehouseArg arg)
        => (await mediator.Send(new UpdateWarehouseCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelWarehouseAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteWarehouseCommand(id)))
            .ToOk(e => Results.Ok(e));
}
