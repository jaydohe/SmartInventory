namespace SI.Webapi.Middlewares;

public class JWTReCheckHandler
(
    RequestDelegate _next
)
{
    public async Task InvokeAsync(HttpContext context)
    {
       if (context == null)
        {
            throw new ArgumentNullException(nameof(context), nameof(context) + " is required");
        }

        // if (context.User.Identity is { IsAuthenticated: true })
        // {
            
        // }

        await _next(context);

      
    }
}
