using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.OrderFeatures.Commands;
using SI.Application.Features.OrderFeatures.Queries;
using SI.Contract.OrderContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class OrderEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var orderGR = endpoints
            .MapGroup($"{defaultPath}/order")
            .WithDisplayName("Order")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        orderGR.MapGet("/get-all", GetAllOrderAsync).RequireAuthorization(APIPolicies.ADMIN);
        orderGR.MapGet("/get-by-id/{id}", GetOrderAsync).RequireAuthorization(APIPolicies.STAFF_SALESMAN);
        orderGR.MapPost("/create", CreateOrderAsync).RequireAuthorization(APIPolicies.STAFF_SALESMAN);
        orderGR.MapPatch("/update/{id}", UpdateOrderAsync).RequireAuthorization(APIPolicies.STAFF_SALESMAN);
        orderGR.MapDelete("/delete/{id}", DelOrderAsync).RequireAuthorization(APIPolicies.STAFF_SALESMAN);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllOrderAsync(
        [FromServices] IMediator mediator)
        => (await mediator.Send(new GetAllOrderQuery()))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetOrderAsync(
        [FromServices] IMediator mediator, string id)
            => (await mediator.Send(new GetOrderQuery(id)))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateOrderAsync(
        [FromServices] IMediator mediator, [FromBody] CreateOrderArg arg)
        => (await mediator.Send(new CreateOrderCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateOrderAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateOrderStatusArg arg)
        => (await mediator.Send(new UpdateOrderStatusCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelOrderAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteOrderCommand(id)))
            .ToOk(e => Results.Ok(e));
}