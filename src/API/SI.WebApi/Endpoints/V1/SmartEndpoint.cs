using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.SmartFeatures.Queries;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class SmartEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var smartGR = endpoints
            .MapGroup($"{defaultPath}/smart")
            .WithDisplayName("Smart")
            .WithApiVersionSet(version)
            .HasApiVersion(1)
            .RequireAuthorization(APIPolicies.STAFFFULL);

        smartGR.MapGet("/get-all-demand", GetAllDemandForecastAsync);
        smartGR.MapGet("/get-demand-by-id/{prodId}/{wareId}", GetDemandForecastAsync);
        smartGR.MapGet("/get-all-optimize", GetAllInventoryOptimizationAsync);
        smartGR.MapGet("/get-optimize-by-id/{prodId}/{wareId}", GetInventoryOptimizationAsync);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllDemandForecastAsync(
        [FromServices] IMediator mediator)
        => (await mediator.Send(new GetAllDemandForecastQuery()))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetDemandForecastAsync(
        [FromServices] IMediator mediator, string prodId, string wareId)
            => (await mediator.Send(new GetDemandForecastQuery(prodId, wareId)))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetAllInventoryOptimizationAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllInventoryOptimizationQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetInventoryOptimizationAsync(
        [FromServices] IMediator mediator, string prodId, string wareId)
            => (await mediator.Send(new GetInventoryOptimizationQuery(prodId, wareId)))
                .ToOk(e => Results.Ok(e));
}
