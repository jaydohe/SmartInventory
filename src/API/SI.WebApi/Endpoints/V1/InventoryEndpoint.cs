using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.InventoryFeatures.Commands;
using SI.Application.Features.InventoryFeatures.Queries;
using SI.Contract.InventoryContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class InventoryEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var inventoryGR = endpoints
            .MapGroup($"{defaultPath}/inventory")
            .WithDisplayName("Inventory")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        inventoryGR.MapGet("/get-all", GetAllInventoryAsync).RequireAuthorization(APIPolicies.FULL);
        inventoryGR.MapGet("/get-by-product/{productId}", GetInventoryAsync).RequireAuthorization(APIPolicies.SALESFULL);
        inventoryGR.MapPatch("/update/{id}", UpdateInventoryAsync).RequireAuthorization(APIPolicies.STAFFFULL);

        return endpoints;
    }

    //private method
    private async Task<IResult> GetAllInventoryAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllInventoryQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetInventoryAsync(
        [FromServices] IMediator mediator, string productId)
        => (await mediator.Send(new GetInventoryQuery(productId)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateInventoryAsync(
    [FromServices] IMediator mediator, string id, [FromBody] UpdateInventoryArg arg)
       => (await mediator.Send(new UpdateInventoryCommand(id, arg)))
           .ToOk(e => Results.Ok(e));
}
