using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.NotificationFeatures.Commands;
using SI.Application.Features.NotificationFeatures.Queries;
using SI.Contract.NotificationContract;
using SI.Webapi.Extensions;

namespace ZLight.WebApi.Endpoints.V1.private_api;

public class NotificationEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var notifGroup = endpoints
            .MapGroup($"private-api/Notification")
            .WithDisplayName("Notification")
            .RequireAuthorization();

        notifGroup.MapPatch("/", UpdateIsMarkedAsync);
        notifGroup.MapGet("/count", CountNotifAsync);

        return endpoints;
    }

    private async Task<IResult> UpdateIsMarkedAsync(
        [FromServices] IMediator mediator,
        [FromBody] string[] notifIds
    )
    {
        return (await mediator.Send(
            new UpdateIsMarkedCommand(
                new UpdateIsMarkedArg
                {
                    NotifIds = notifIds
                })))
            .ToOk(e => Results.Ok(e));
    }
    private async Task<IResult> CountNotifAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new CountNotificationQuery(request.ToQueryContext())))
        .ToOk(e => Results.Ok(e));

}
