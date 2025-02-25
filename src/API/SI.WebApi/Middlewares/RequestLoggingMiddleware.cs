using SI.Domain.Common.Utils;

namespace SI.Webapi.Middlewares;

public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestLoggingMiddleware> _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

   public async Task InvokeAsync(HttpContext context)
    {
        // Get the full URL and caller IP
        var request = context.Request;
        var fullUrl = $"{request.Scheme}://{request.Host}{request.Path}{request.QueryString}";
        var callerIp = context.Connection.RemoteIpAddress?.MapToIPv4().ToString();

        DateTimeOffset requestTime = DateTime.UtcNow; // Use UTC for consistency
        _logger.LogInformation(
                "Request received at {RequestTime}. URL: {FullUrl}, Caller IP: {CallerIp}", 
                requestTime.ToLocal(), 
                fullUrl, 
                callerIp
            );
        // Capture the response body
        var originalBodyStream = context.Response.Body;
        using var responseBody = new MemoryStream();
        context.Response.Body = responseBody;

        try
        {
            // Call the next middleware in the pipeline
            await _next(context);

            // Log status code
            var statusCode = context.Response.StatusCode;

            if (statusCode != StatusCodes.Status200OK)
            {
                // Read and log the response body if the status code is not 200
                context.Response.Body.Seek(0, SeekOrigin.Begin);
                var responseText = await new StreamReader(context.Response.Body).ReadToEndAsync();
                context.Response.Body.Seek(0, SeekOrigin.Begin);

                _logger.LogWarning("Response status code: {StatusCode}, Response body: {ResponseBody}", statusCode, responseText);
            }
        }
        catch (Exception ex)
        {
            // Log exception details
            _logger.LogError(ex, "An error occurred while processing the request.");

            // Re-throw the exception to let the pipeline handle it (e.g., return a 500 status code)
            throw;
        }
        finally
        {
            // Copy the content of the response body back to the original stream
            context.Response.Body.Seek(0, SeekOrigin.Begin);
            await responseBody.CopyToAsync(originalBodyStream);
        }
    }

}
