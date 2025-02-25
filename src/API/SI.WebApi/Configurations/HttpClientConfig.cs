using SI.Infrastructure.Integrations;

namespace SI.WebApi.Configurations;

public static class HttpClientConfig
{
    public static void AddHttpClientConfig(this IServiceCollection services, IConfiguration configuration)
    {
        var provinceUrl = configuration["ProvinceOpenAPI:HostName"];
        services.AddHttpClient<ProvinceOpenAPIService>("province_openapi", (client) =>
        {
            client.BaseAddress = new Uri(provinceUrl ?? "https://provinces.open-api.vn");
        });

    }
}
