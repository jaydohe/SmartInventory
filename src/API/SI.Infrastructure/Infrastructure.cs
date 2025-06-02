using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SI.Infrastructure.Persistence;
using SI.Infrastructure.Common.Mapping;
using SI.Infrastructure.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using Quartz;
using SI.Infrastructure.Integrations.CronJob;
using Pomelo.EntityFrameworkCore.MySql.Internal;

namespace SI.Infrastructure;

public static class Infrastructure
{
    public static void AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("MySql");
        services.AddDbContext<DbContext, SIDbContext>(options => options
            .UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
            sqlOptions =>
            {
                sqlOptions.EnablePrimitiveCollectionsSupport(true);
                sqlOptions.TranslateParameterizedCollectionsToConstants();
            })
            .EnableSensitiveDataLogging());

        services.AddScoped<IUnitOfWork, UnitOfWork<SIDbContext>>();
        services.AddScoped(typeof(IRepository<>), typeof(SIRepository<>));
        services.RegisterMapsterConfiguration();

        var mapperConfig = new MapperConfiguration(cfg =>
        {
            cfg.AddProfile<MappingProfile>();
        });

        IMapper mapper = mapperConfig.CreateMapper();
        services.AddSingleton(mapper);

        // Quartz.NET configuration
        services.AddQuartz(q =>
        {
            //Register your jobs here
            q.AddJob<HoltWintersJob>(opts => opts.WithIdentity("HoltWintersJob"));
            q.AddTrigger(opts => opts
                .ForJob("HoltWintersJob")
                .WithIdentity("HoltWintersTrigger")
                .WithCronSchedule("0 0 0 1 * ?")); // "0 * * * * ?" : 1 minute
                                                   // "0 0/5 * * * ?" : 5 minute
                                                   // "0 0 4 * * ?" : 4AM every day
                                                   // "0 0 0 1 * ?" : 1st day of every month
                                                   // "0 0 * * 0" : every Sunday

            q.AddJob<EOQSafetyStockJob>(opts => opts.WithIdentity("EOQSafetyStockJob"));
            q.AddTrigger(opts => opts
                .ForJob("EOQSafetyStockJob")
                .WithIdentity("EOQSafetyStockTrigger")
                .WithCronSchedule("0 0 4 ? * SUN")); // "0 0 4 ? * SUN" : 4AM every sunday

            q.AddJob<LowInventoryJob>(opts => opts.WithIdentity("LowInventoryJob"));
            q.AddTrigger(opts => opts
                .ForJob("LowInventoryJob")
                .WithIdentity("LowInventoryTrigger")
                .WithCronSchedule("0 0 4 * * ?")); // "0 0 4 * * ?" : 4AM every day
        });

        // Quartz.NET hosted service
        services.AddQuartzHostedService(options =>
        {
            options.WaitForJobsToComplete = true;
        });
    }
}
