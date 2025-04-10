using Asp.Versioning.Builder;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.LocationFeature.Commands;
using SI.Webapi.Extensions;

namespace SI.Webapi.Endpoints.V1;

public class LocationEndpointV1 : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var locationGr= endpoints
            .MapGroup($"{defaultPath}/location")
            .WithDisplayName("location")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        locationGr.MapPost("/fetch", FetchAsync);

        return endpoints;
    }

    // private method 
    private async Task<IResult> FetchAsync(
        [FromServices] IMediator mediator)
        => (await mediator.Send(new FetchLocationCommand()))
            .ToOk(e => Results.Ok(e));

}
