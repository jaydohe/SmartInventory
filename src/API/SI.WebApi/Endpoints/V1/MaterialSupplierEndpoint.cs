using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.MaterialSupplierFeatures.Commands;
using SI.Application.Features.MaterialSupplierFeatures.Queries;
using SI.Contract.MaterialSupplierContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class MaterialSupplierEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var materialSupplierGR = endpoints
            .MapGroup($"{defaultPath}/material-supplier")
            .WithDisplayName("Material Supplier")
            .WithApiVersionSet(version)
            .HasApiVersion(1)
            .RequireAuthorization(APIPolicies.STAFFFULL);

        materialSupplierGR.MapGet("/get-all", GetAllMaterialSupplierAsync);
        materialSupplierGR.MapGet("/get-by-id/{id}", GetMaterialSupplierAsync);
        materialSupplierGR.MapPost("/create", CreateMaterialSupplierAsync);
        materialSupplierGR.MapPatch("/update/{id}", UpdateMaterialSupplierAsync);
        materialSupplierGR.MapDelete("/delete/{id}", DelMaterialSupplierAsync);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllMaterialSupplierAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllMaterialSupplierQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetMaterialSupplierAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetMaterialSupplierQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateMaterialSupplierAsync(
        [FromServices] IMediator mediator, [FromBody] CreateMaterialSupplierArg arg)
        => (await mediator.Send(new CreateMaterialSupplierCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateMaterialSupplierAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateMaterialSupplierArg arg)
        => (await mediator.Send(new UpdateMaterialSupplierCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelMaterialSupplierAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteMaterialSupplierCommand(id)))
            .ToOk(e => Results.Ok(e));
}