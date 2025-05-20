using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.ProductionCommandFeatures.Commands;
using SI.Application.Features.ProductionCommandFeatures.Queries;
using SI.Contract.ProductionCommandContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class ProductionCommandEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var productionCommandGR = endpoints
            .MapGroup($"{defaultPath}/production-command")
            .WithDisplayName("ProductionCommand")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        productionCommandGR.MapGet("/get-all", GetAllProductionCommandAsync).RequireAuthorization(APIPolicies.STAFF_PRODUCER);
        productionCommandGR.MapGet("/get-by-id/{id}", GetProductionCommandAsync).RequireAuthorization(APIPolicies.STAFF_PRODUCER);
        productionCommandGR.MapPost("/create", CreateProductionCommandAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        productionCommandGR.MapPost("/request", RequestProductionCommandAsync).RequireAuthorization(APIPolicies.SALESFULL);
        productionCommandGR.MapPatch("/update/{id}", UpdateProductionCommandAsync).RequireAuthorization(APIPolicies.PRODUCERFULL);
        productionCommandGR.MapPatch("/update-status/{id}", UpdateStatusProductionCommandAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        productionCommandGR.MapDelete("/delete/{id}", DelProductionCommandAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        
        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllProductionCommandAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllProductionCommandQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetProductionCommandAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetProductionCommandQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateProductionCommandAsync(
        [FromServices] IMediator mediator, [FromBody] CreateProductionCommandArg arg)
        => (await mediator.Send(new CreateProductionCommandCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> RequestProductionCommandAsync(
        [FromServices] IMediator mediator, [FromBody] RequestProductionCommandArg arg)
        => (await mediator.Send(new RequestProductionCommandCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateProductionCommandAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateProductionCommandProcessArg arg)
        => (await mediator.Send(new UpdateProductionProcessCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateStatusProductionCommandAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateProductionStatusArg arg)
        => (await mediator.Send(new UpdateProductionStatusCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelProductionCommandAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteProductionCommandCommand(id)))
            .ToOk(e => Results.Ok(e));
}
