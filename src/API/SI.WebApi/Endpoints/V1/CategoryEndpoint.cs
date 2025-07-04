﻿using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.CategoryFeatures.Commands;
using SI.Application.Features.CategoryFeatures.Queries;
using SI.Contract.CategoryContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class CategoryEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var catGR = endpoints
            .MapGroup($"{defaultPath}/category")
            .WithDisplayName("Category")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        catGR.MapGet("/get-all-product", GetAllCategoryProductAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        catGR.MapGet("/get-all-warehouse", GetAllCategoryWarehouseAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        catGR.MapGet("/get-by-id/{id}", GetCategoryAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        catGR.MapPost("/create-product", CreateCategoryProductAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        catGR.MapPost("/create-warehouse", CreateCategoryWarehouseAsync).RequireAuthorization(APIPolicies.ADMIN);
        catGR.MapPatch("/update/{id}", UpdateCategoryAsync).RequireAuthorization(APIPolicies.ADMIN);
        catGR.MapDelete("/delete/{id}", DelCategoryAsync).RequireAuthorization(APIPolicies.ADMIN);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllCategoryProductAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllCategoryProductQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetAllCategoryWarehouseAsync(
    [FromServices] IMediator mediator, BaseAPIPageRequest request)
    => (await mediator.Send(new GetAllCategoryWarehouseQuery(request.ToQueryContext())))
        .ToOk(e => Results.Ok(e));


    private async Task<IResult> GetCategoryAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetCategoryQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateCategoryProductAsync(
        [FromServices] IMediator mediator, [FromBody] CreateCategoryArg arg)
        => (await mediator.Send(new CreateCategoryProductCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateCategoryWarehouseAsync(
        [FromServices] IMediator mediator, [FromBody] CreateCategoryArg arg)
        => (await mediator.Send(new CreateCategoryWarehouseCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateCategoryAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateCategoryArg arg)
        => (await mediator.Send(new UpdateCategoryCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelCategoryAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteCategoryCommand(id)))
            .ToOk(e => Results.Ok(e));
}
