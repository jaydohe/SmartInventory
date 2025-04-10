using SI.Webapi.Configurations;
using SI.Infrastructure;
using SI.Application;
using SI.Webapi.Middlewares;
using Asp.Versioning.Builder;
using Asp.Versioning;
using SI.Webapi.Extensions;
using Microsoft.Extensions.FileProviders;
using SI.WebApi.Configurations;
using System.Text.Json.Serialization;
using CTCore.DynamicQuery.OData;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using System.Text.Json;
using SI.Application.SignalR.Hubs;

var builder = WebApplication.CreateBuilder(args);

builder.Logging.ClearProviders();
builder.Services.AddLogging(
    builder =>
    builder.AddConsole());

builder.Services
    .AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerConfigure();
builder.Services.AddVersionApi();
builder.Services.AddCorsConfig();
builder.Services.AddJWTConfig(builder.Configuration);
builder.Services.RegisterEndpoints();
builder.Services.AddHttpClientConfig(builder.Configuration);

builder.Services.AddHybridCache();

builder.Services.Configure<Microsoft.AspNetCore.Http.Json.JsonOptions>(
    options =>
    {
        options.SerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        options.SerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    }
);
builder.Services
    .AddGenericODataEndpoints();

// Add health checks
builder.Services.AddHealthChecks()
    .AddMySql(builder.Configuration.GetConnectionString("MySql")!, name: "mysql");

var app = builder.Build();

app.UseGenericODataEndpoints();

ApiVersionSet versionSet = app.NewApiVersionSet()
    .HasApiVersion(ApiVersion.Default)
    .ReportApiVersions()
    .Build();

app.MapEndpoints(versionSet);

if (true) //(app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var uploadPath = Path.Combine(builder.Environment.ContentRootPath, "Uploads");
if (!Directory.Exists(uploadPath))
{
    Directory.CreateDirectory(uploadPath);
}

app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadPath),
    RequestPath = "/uploads"
});
app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthentication();

app.UseMiddleware<CustomExceptionHandler>();
app.UseMiddleware<DeviceCodeCheckHandler>();
app.UseMiddleware<JWTReCheckHandler>();
app.UseMiddleware<RequestLoggingMiddleware>();
// app.UseOutputCache();

app.UseAuthorization();

//app.UseAntiforgery();

app.MapControllers();

app.MapGet("/timestamp", () => {
    return Results.Ok(DateTimeOffset.UtcNow.AddHours(7).AddSeconds(-3).ToUnixTimeSeconds());

});

// Map health check endpoints
app.MapHealthChecks("/health", new HealthCheckOptions
{
    Predicate = _ => true,
    ResponseWriter = async (context, report) =>
    {
        context.Response.ContentType = "application/json";
        var result = JsonSerializer.Serialize(new
        {
            status = report.Status.ToString(),
            checks = report.Entries.Select(entry => new
            {
                name = entry.Key,
                status = entry.Value.Status.ToString(),
                exception = entry.Value.Exception?.Message,
                duration = entry.Value.Duration.ToString()
            })
        });
        await context.Response.WriteAsync(result);
    }
});

app.MapHub<MonitorHub>("/hub");

app.Run();