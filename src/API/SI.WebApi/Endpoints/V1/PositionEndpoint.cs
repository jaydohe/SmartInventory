using Asp.Versioning.Builder;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.PositionFeatures.Commands;
using SI.Contract.PositionContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class PositionEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var positionGR = endpoints
            .MapGroup($"{defaultPath}/position")
            .WithDisplayName("Position")
            .WithApiVersionSet(version)
            .HasApiVersion(1)
            .RequireAuthorization(APIPolicies.ADMIN);

        positionGR.MapPost("/create", CraetePositionAsync);
        positionGR.MapPatch("/update/{id}", UpdatePositionAsync);

        return endpoints;
    }

    // private method
    private async Task<IResult> CraetePositionAsync(
        [FromServices] IMediator mediator, [FromBody] PositionArg arg)
        => (await mediator.Send(new CreatePositionCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdatePositionAsync(
        [FromServices] IMediator mediator, string id, [FromBody] PositionArg arg)
        => (await mediator.Send(new UpdatePositionCommand(id, arg)))
            .ToOk(e => Results.Ok(e));
}
