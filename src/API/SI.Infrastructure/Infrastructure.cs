using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SI.Infrastructure.Persistence;
using SI.Infrastructure.Common.Mapping;
using SI.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using SI.Infrastructure.Integrations;
using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using SI.Domain.Storage;
using SI.Infrastructure.Integrations.SimpleStorage;
using Minio;
using SI.Infrastructure.Integrations.OpenXML;
using SI.Infrastructure.Integrations.CronJob;
using Quartz;
using Minio.Exceptions;

namespace SI.Infrastructure;

public static class Infrastructure
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("MySql");
        services.AddDbContext<DbContext, SIDbContext>(options => options
            .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString))
            .EnableSensitiveDataLogging());

        services.AddScoped<IUnitOfWork, UnitOfWork<SIDbContext>>();
        services.AddScoped(typeof(IRepository<>), typeof(SIRepository<>));
        services.RegisterMapsterConfiguration();
        services.AddScoped<ProvinceOpenAPIService>();

        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfile>();
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        var secretKey = Environment.GetEnvironmentVariable("S3_SECRET_KEY") ?? configuration["SimpleStorage:SecretKey"];
        var accessKey = Environment.GetEnvironmentVariable("S3_ACCESS_KEY") ?? configuration["SimpleStorage:AccessKey"];
        var serviceUrl = configuration["SimpleStorage:ServiceUrl"];

        services.AddMinio(configureClient => configureClient
            .WithEndpoint(serviceUrl)
            .WithCredentials(accessKey, secretKey)
            .WithSSL(serviceUrl!.StartsWith("https"))
            .Build());

        services.AddScoped<ISimpleStorage, SIService>();

        services.AddScoped<TicketStatisticETE>();

        // Quartz.NET configuration
        services.AddQuartz(q =>
        {
            // Register your jobs here
            q.AddJob<CheckExpireAtJob>(opts => opts.WithIdentity("CheckExpireAtJob"));
            q.AddTrigger(opts => opts
                .ForJob("CheckExpireAtJob")
                .WithIdentity("CheckExpiryTrigger")
                .WithCronSchedule("0 0 4 * * ?")); // "0 * * * * ?" : 1 minute
                                                   // "0 0/5 * * * ?" : 5 minute
                                                   // "0 0 4 * * ?" : 4AM every day
        });

        // Quartz.NET hosted service
        services.AddQuartzHostedService(options =>
        {
            options.WaitForJobsToComplete = true;
        });
    }
}
