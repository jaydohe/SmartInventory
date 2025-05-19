using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.ProductFeatures.Commands;
using SI.Application.Features.ProductFeatures.Queries;
using SI.Contract.ProductContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class ProductEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var productGR = endpoints
            .MapGroup($"{defaultPath}/product")
            .WithDisplayName("Product")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        productGR.MapGet("/get-all", GetAllProductAsync).RequireAuthorization(APIPolicies.FULL);
        productGR.MapGet("/get-by-id/{id}", GetProductAsync).RequireAuthorization(APIPolicies.FULL);
        productGR.MapPost("/create", CreateProductAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        productGR.MapPatch("/update/{id}", UpdateProductAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        productGR.MapDelete("/delete/{id}", DelProductAsync).RequireAuthorization(APIPolicies.STAFFFULL);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllProductAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllProductQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetProductAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetProductQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateProductAsync(
        [FromServices] IMediator mediator, [FromBody] CreateProductArg arg)
        => (await mediator.Send(new CreateProductCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateProductAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateProductArg arg)
        => (await mediator.Send(new UpdateProductCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelProductAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteProductCommand(id)))
            .ToOk(e => Results.Ok(e));
}
