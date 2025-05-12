using Asp.Versioning.Builder;
using SI.Webapi.Extensions;

namespace SI.WebApi.Endpoints.V1;

public class SmartEndpoint : IEndpoint
{
    public IEndpointRouteBuilder MapEndpoints(IEndpointRouteBuilder endpoints, ApiVersionSet version)
    {
        var defaultPath = $"{EndpointExntensions.BASE_ROUTE}";
        var smartGR = endpoints
            .MapGroup($"{defaultPath}/smart")
            .WithDisplayName("Smart")
            .WithApiVersionSet(version)
            .HasApiVersion(1);  
        //smartGR.MapGet("/get-all", GetAllSmartAsync).RequireAuthorization(APIPolicies.STAFF_SALESMAN);
        //smartGR.MapGet("/get-by-id/{id}", GetSmartAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        //smartGR.MapPost("/create", CreateSmartAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        //smartGR.MapPatch("/update/{id}", UpdateSmartAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        //smartGR.MapDelete("/delete/{id}", DelSmartAsync).RequireAuthorization(APIPolicies.STAFFFULL);
        return endpoints;
    }
}
