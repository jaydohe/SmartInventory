using Asp.Versioning.Builder;
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

        setupGR.MapGet("/get-setup", GetSetupAsync);
        setupGR.MapPost("/", SetupAsync);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetSetupAsync(
        [FromServices] IMediator mediator)
        => (await mediator.Send(new GetSetupQuery()))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> SetupAsync(
        [FromServices] IMediator mediator, [FromBody] SetupArg arg)
        => (await mediator.Send(new SetupCommand(arg)))
            .ToOk(e => Results.Ok(e));
}