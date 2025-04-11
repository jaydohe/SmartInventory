using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.AuthenticateFeatures.Commands;
using SI.Application.Features.AuthenticateFeatures.Queries;
using SI.Contract.AuthenticateContract;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class AuthenticateEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var authGR = endpoints
            .MapGroup($"{defaultPath}/auth")
            .WithDisplayName("Authentication")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        authGR.MapPost("/login", LoginAsync);
        authGR.MapPost("/refresh-token", RefreshTokenAsync);
        authGR.MapPatch("/update-meInfo", PatchUpdateMeInForAsync).RequireAuthorization();
        authGR.MapPut("/update-password", PutUpdatePasswordAsync).RequireAuthorization();
        authGR.MapGet("/get-me", GetMeAsync).RequireAuthorization().RequireAuthorization();

        return endpoints;
    }

    // private method 
    private async Task<IResult> LoginAsync(
        [FromServices] IMediator mediator, [FromBody] LoginArg arg)
        => (await mediator.Send(new LoginCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> RefreshTokenAsync(
        [FromServices] IMediator mediator, [FromBody] RefreshArg arg)
        => (await mediator.Send(new RefreshTokenCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> PatchUpdateMeInForAsync(
        [FromServices] IMediator mediator, [FromBody] UpdateMeInfoArg arg)
        => (await mediator.Send(new UpdateMeInfoCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> PutUpdatePasswordAsync(
        [FromServices] IMediator mediator, [FromBody] UpdatePasswordArg arg)
        => (await mediator.Send(new UpdatePasswordCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetMeAsync(
       [FromServices] IMediator mediator, BaseAPIRequest request)
        => (await mediator.Send(new GetMeQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));
}
