using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.GoodsReceiptFeatures.Commands;
using SI.Application.Features.GoodsReceiptFeatures.Queries;
using SI.Contract.GoodsReceiptContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class GoodsReceiptEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var goodsReceiptGR = endpoints
            .MapGroup($"{defaultPath}/goods-receipt")
            .WithDisplayName("Goods Receipt")
            .WithApiVersionSet(version)
            .HasApiVersion(1)
            .RequireAuthorization(APIPolicies.STAFFFULL);

        goodsReceiptGR.MapGet("/get-all", GetAllGoodsReceiptAsync);
        goodsReceiptGR.MapGet("/get-by-id/{id}", GetGoodsReceiptAsync);
        goodsReceiptGR.MapPost("/create-material", CreateGoodsReceiptMaterialAsync);
        goodsReceiptGR.MapPost("/create-order", CreateGoodsReceiptOrderAsync);
        goodsReceiptGR.MapPost("/create-production", CreateGoodsReceiptProductionAsync);
        goodsReceiptGR.MapPatch("/update/{id}", UpdateGoodsReceiptAsync);
        goodsReceiptGR.MapDelete("/delete/{id}", DelGoodsReceiptAsync);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllGoodsReceiptAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllGoodsReceiptQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetGoodsReceiptAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetGoodsReceiptQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateGoodsReceiptMaterialAsync(
        [FromServices] IMediator mediator, [FromBody] CreateGoodsReceiptMaterialArg arg)
        => (await mediator.Send(new CreateGoodsReceiptMaterialCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateGoodsReceiptOrderAsync(
        [FromServices] IMediator mediator, [FromBody] CreateGoodsReceiptOrderArg arg)
        => (await mediator.Send(new CreateGoodsReceiptOrderCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateGoodsReceiptProductionAsync(
        [FromServices] IMediator mediator, [FromBody] CreateGoodsReceiptProductionArg arg)
        => (await mediator.Send(new CreateGoodsReceiptProductionCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateGoodsReceiptAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateGoodsReceiptArg arg)
        => (await mediator.Send(new UpdateGoodsReceiptCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelGoodsReceiptAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteGoodsReceiptCommand(id)))
            .ToOk(e => Results.Ok(e));
}
