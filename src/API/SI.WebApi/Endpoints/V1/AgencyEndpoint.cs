using Asp.Versioning.Builder;
using CTCore.DynamicQuery;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using SI.Application.Features.AgencyFeatures.Commands;
using SI.Application.Features.AgencyFeatures.Queries;
using SI.Contract.AgencyContract;
using SI.Domain.Enums;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class AgencyEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var agencyGR = endpoints
            .MapGroup($"{defaultPath}/agency")
            .WithDisplayName("Agency")
            .WithApiVersionSet(version)
            .HasApiVersion(1);

        agencyGR.MapGet("/get-all", GetAllAgencyAsync).RequireAuthorization(APIPolicies.STAFF_SALESMAN);
        agencyGR.MapGet("/get-by-id/{id}", GetAgencyAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        agencyGR.MapPost("/create", CreateAgencyAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        agencyGR.MapPatch("/update/{id}", UpdateAgencyAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        agencyGR.MapDelete("/delete/{id}", DelAgencyAsync).RequireAuthorization(APIPolicies.STAFFFULL);

        return endpoints;
    }

    // private method
    private async Task<IResult> GetAllAgencyAsync(
        [FromServices] IMediator mediator, BaseAPIPageRequest request)
        => (await mediator.Send(new GetAllAgencyQuery(request.ToQueryContext())))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> GetAgencyAsync(
        [FromServices] IMediator mediator, string id, BaseAPIRequest request)
            => (await mediator.Send(new GetAgencyQuery(id, request.ToQueryContext())))
                .ToOk(e => Results.Ok(e));

    private async Task<IResult> CreateAgencyAsync(
        [FromServices] IMediator mediator, [FromBody] CreateAgencyArg arg)
        => (await mediator.Send(new CreateAgencyCommand(arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> UpdateAgencyAsync(
        [FromServices] IMediator mediator, string id, [FromBody] UpdateAgencyArg arg)
        => (await mediator.Send(new UpdateAgencyCommand(id, arg)))
            .ToOk(e => Results.Ok(e));

    private async Task<IResult> DelAgencyAsync(
        [FromServices] IMediator mediator, string id)
        => (await mediator.Send(new DeleteAgencyCommand(id)))
            .ToOk(e => Results.Ok(e));
}