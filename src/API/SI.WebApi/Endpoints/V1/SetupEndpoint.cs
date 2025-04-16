using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.SetupFeatures.Commands;
using SI.Application.Features.SetupFeatures.Queries;
using SI.Contract.SetupContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class SetupEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var setupGR = endpoints
            .MapGroup($"{defaultPath}/setup")
            .WithDisplayName("Setup")
            .WithApiVersionSet(version)
            .HasApiVersion(1)
            .RequireAuthorization(APIPolicies.ADMIN);

        setupGR.MapGet("/get-zscore", GetZscoreAsync);
        setupGR.MapPost("/zscore", SetupZscoreAsync);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetZscoreAsync(
        [FromServices] IMediator mediator)
        => (await mediator.Send(new GetZscoreQuery()))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> SetupZscoreAsync(
        [FromServices] IMediator mediator, [FromBody] SetupZscoreArg arg)
        => (await mediator.Send(new SetupZscoreCommand(arg)))
            .ToOk(e => Results.Ok(e));
}