namespace SI.Webapi.Middlewares;

public class DeviceCodeCheckHandler
(
    RequestDelegate _next
)
{  
    public async Task InvokeAsync(HttpContext context)
    {
        var urlPath = context.Request.Path.ToString();
        
        if (urlPath.Contains("/timestamp"))
        {
            await _next(context);
            return;
        }

        if (!urlPath.Contains("/ext-api"))
        {
            await _next(context);
            return;
        }

        if (!context.Request.Headers.TryGetValue("APIKEY", out var extractedApiKey))
        {
            context.Response.StatusCode = 401;
            await context.Response.WriteAsync("API NOT AUTHENTICATE.");
            return;
        }
         

        if ( string.IsNullOrEmpty(extractedApiKey) 
            || extractedApiKey != "4e56b0d73b754e48bc0dd9a9974ee48a") {
            context.Response.StatusCode = 403;
            await context.Response.WriteAsync("API NOT AUTHROZIATE.");
            return;
        }

        await _next(context);
    }
}
