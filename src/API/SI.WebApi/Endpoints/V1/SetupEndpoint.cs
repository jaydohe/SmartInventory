using Asp.Versioning.Builder;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.SetupFeatures;
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

        setupGR.MapPost("/zscore", SetupZscoreAsync);

        return endpoints;
    }
    private async Task<IResult> SetupZscoreAsync(
        [FromServices] IMediator mediator, [FromBody] SetupZscoreArg arg)
        => (await mediator.Send(new SetupZscoreCommand(arg)))
            .ToOk(e => Results.Ok(e));
}