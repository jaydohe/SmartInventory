using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.EmployeeFeatures.Commands;
using SI.Application.Features.EmployeeFeatures.Queries;
using SI.Contract.EmployeeContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class EmployeeEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var empGR = endpoints
            .MapGroup($"{defaultPath}/employee")
            .WithDisplayName("Employee")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        empGR.MapGet("/get-all", GetAllEmployeeAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        empGR.MapGet("/get-by-id/{id}", GetEmployeeAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        empGR.MapPost("/create", CreateEmployeeAsync).RequireAuthorization(APIPolicies.ADMIN);
        empGR.MapPatch("/update/{id}", UpdateEmployeeAsync).RequireAuthorization(APIPolicies.ADMIN);
        empGR.MapDelete("/delete/{id}", DelEmployeeAsync).RequireAuthorization(APIPolicies.ADMIN);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllEmployeeAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllEmployeeQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetEmployeeAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetEmployeeQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateEmployeeAsync(
        [FromServices] IMediator mediator, [FromBody] CreateEmployeeArg arg)
        => (await mediator.Send(new CreateEmployeeCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateEmployeeAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateEmployeeArg arg)
        => (await mediator.Send(new UpdateEmployeeCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelEmployeeAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteEmployeeCommand(id)))
            .ToOk(e => Results.Ok(e));
}