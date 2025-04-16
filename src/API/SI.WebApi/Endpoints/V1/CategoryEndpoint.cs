using Asp.Versioning.Builder;
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

        catGR.MapGet("/get-all", GetAllCategoryAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        catGR.MapGet("/get-by-id/{id}", GetCategoryAsync).RequireAuthorization(APIPolicies.ADMIN);
        catGR.MapPost("/create", CreateCategoryAsync).RequireAuthorization(APIPolicies.ADMIN);
        catGR.MapPatch("/update/{id}", UpdateCategoryAsync).RequireAuthorization(APIPolicies.ADMIN);
        catGR.MapDelete("/delete/{id}", DelCategoryAsync).RequireAuthorization(APIPolicies.ADMIN);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllCategoryAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllCategoryQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetCategoryAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetCategoryQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateCategoryAsync(
    [FromServices] IMediator mediator, [FromBody] CreateCategoryArg arg)
    => (await mediator.Send(new CreateCategoryCommand(arg)))
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
