using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.BOMFeatures.Commands;
using SI.Application.Features.BOMFeatures.Queries;
using SI.Contract.BOMContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class BOMEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var bomGR = endpoints
            .MapGroup($"{defaultPath}/bom")
            .WithDisplayName("BOM")
            .WithApiVersionSet(version)
            .HasApiVersion(1)
            .RequireAuthorization(APIPolicies.STAFF_PRODUCER);

        bomGR.MapGet("/get-all", GetAllBOMAsync);
        bomGR.MapGet("/get-by-id/{id}", GetBOMAsync);
        bomGR.MapPost("/create", CreateBOMAsync);
        bomGR.MapPatch("/update/{id}", UpdateBOMAsync);
        bomGR.MapDelete("/delete/{id}", DelBOMAsync);

        return endpoints;
    }
    // private method
    private async Task<IResult> GetAllBOMAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllBOMQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));
    private async Task<IResult> GetBOMAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
        => (await mediator.Send(new GetBOMQuery(id, request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateBOMAsync(
        [FromServices] IMediator mediator, [FromBody] CreateBOMArg arg)
        => (await mediator.Send(new CreateBOMCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateBOMAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateBOMArg arg)
        => (await mediator.Send(new UpdateBOMCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelBOMAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteBOMCommand(id)))
            .ToOk(e => Results.Ok(e));
}
