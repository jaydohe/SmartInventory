using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.GoodsIssueFeatures.Commands;
using SI.Application.Features.GoodsIssueFeatures.Queries;
using SI.Contract.GoodsIssueContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class GoodsIssueEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var goodsIssueGR = endpoints
            .MapGroup($"{defaultPath}/goods-issue")
            .WithDisplayName("Goods Issue")
            .WithApiVersionSet(version)
            .HasApiVersion(1)
            .RequireAuthorization(APIPolicies.STAFFFULL);

        goodsIssueGR.MapGet("/get-all", GetAllGoodsIssueAsync);
        goodsIssueGR.MapGet("/get-by-id/{id}", GetGoodsIssueAsync);
        goodsIssueGR.MapPost("/create", CreateGoodsIssueAsync);
        goodsIssueGR.MapPatch("/update/{code}", UpdateGoodsIssueAsync);
        goodsIssueGR.MapDelete("/delete/{id}", DelGoodsIssueAsync);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllGoodsIssueAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllGoodsIssueQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetGoodsIssueAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetGoodsIssueQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateGoodsIssueAsync(
        [FromServices] IMediator mediator, [FromBody] CreateGoodsIssueArg arg)
        => (await mediator.Send(new CreateGoodsIssueCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateGoodsIssueAsync(
        [FromServices] IMediator mediator, string code, [FromBody] UpdateGoodsIssueArg arg)
        => (await mediator.Send(new UpdateGoodsIssueCommand(code, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelGoodsIssueAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteGoodsIssueCommand(id)))
            .ToOk(e => Results.Ok(e));
}
