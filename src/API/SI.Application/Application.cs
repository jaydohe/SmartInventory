using FluentValidation;
using Microsoft.Extensions.DependencyInjection;
using SI.Application.Core.Behaviors;
using SI.Application.SignalR;
using SI.Domain.Common.Authenticate;
using SI.Infrastructure.Common.Authenticate;

namespace SI.Application;

public static class Application
{
    public static void AddApplication(this IServiceCollection services)
    {
        var assembly = typeof(Application).Assembly;
        services.AddValidatorsFromAssembly(assembly);
        services.AddMediatR(config =>
        {
            config.RegisterServicesFromAssembly(assembly);
            // config.AddOpenBehavior(typeof(ValidationBehaviour<,>));
            config.AddOpenBehavior(typeof(UnitOfWorkBehavior<,>));
        });

        services.AddHttpContextAccessor();
        services.AddScoped<JWTTokenHelper>();
        services.AddScoped<IUserIdentifierProvider, UserIdentitfierProvider>();
        services.AddApplicationHub();
    }
}