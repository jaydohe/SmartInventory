using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.UserFeatures.Commands;
using SI.Application.Features.UserFeatures.Queries;
using SI.Contract.UserContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class UserEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var userGR = endpoints
            .MapGroup($"{defaultPath}/user")
            .WithDisplayName("User")
            .WithApiVersionSet(version)
            .HasApiVersion(1)
            .RequireAuthorization(APIPolicies.ADMIN);

        userGR.MapGet("/get-all", GetAllUserAsync);
        userGR.MapGet("/get-by-id/{id}", GetUserAsync);
        userGR.MapPost("/create", CreateUserAsync);
        userGR.MapPatch("/update-is-login/{id}", UpdateIsLoginAsync);
        userGR.MapPatch("/update-role/{id}/role/{role}", UpdateUserRoleAsync);
        userGR.MapDelete("/delete/{id}", DelUserAsync);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllUserAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllUserQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetUserAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetUserQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateUserAsync(
        [FromServices] IMediator mediator, [FromBody] CreateUserArg arg)
        => (await mediator.Send(new CreateUserCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateIsLoginAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateIsLoginArg arg)
        => (await mediator.Send(new UpdateIsLoginCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateUserRoleAsync(
        [FromServices] IMediator mediator, string id, string role)
        => (await mediator.Send(new UpdateUserRoleCommand(id, role)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelUserAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteUserCommand(id)))
            .ToOk(e => Results.Ok(e));
}
