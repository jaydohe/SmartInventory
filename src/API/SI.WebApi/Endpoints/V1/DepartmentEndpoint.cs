using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.DepartmentFeatures.Commands;
using SI.Application.Features.DepartmentFeatures.Queries;
using SI.Contract.DepartmentContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class DepartmentEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var departmentGR = endpoints
            .MapGroup($"{defaultPath}/department")
            .WithDisplayName("Department")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        departmentGR.MapGet("/get-all", GetAllDepartmentAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        departmentGR.MapGet("/get-by-id/{id}", GetDepartmentAsync).RequireAuthorization(APIPolicies.ADMIN);
        departmentGR.MapPost("/create", CreateDepartmentAsync).RequireAuthorization(APIPolicies.ADMIN);
        departmentGR.MapPatch("/update/{id}", UpdateDepartmentAsync).RequireAuthorization(APIPolicies.ADMIN);
        departmentGR.MapDelete("/delete/{id}", DelDepartmentAsync).RequireAuthorization(APIPolicies.ADMIN);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllDepartmentAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllDepartmentQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetDepartmentAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetDepartmentQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateDepartmentAsync(
        [FromServices] IMediator mediator, [FromBody] CreateDepartmentArg arg)
        => (await mediator.Send(new CreateDepartmentCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateDepartmentAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateDepartmentArg arg)
        => (await mediator.Send(new UpdateDepartmentCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelDepartmentAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteDepartmentCommand(id)))
            .ToOk(e => Results.Ok(e));
}
