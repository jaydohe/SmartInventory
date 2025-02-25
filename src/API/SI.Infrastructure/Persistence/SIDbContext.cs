using SI.Domain.Entities;
using SI.Domain.ValueObjeZLight.Location;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace SI.Infrastructure.Persistence;

public class SIDbContext : DbContext
{
    /// <summary>
    /// For production and development use
    /// </summary>
    /// <param name="options"></param>
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    public SIDbContext(DbContextOptions<SIDbContext> options)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
        : base(options)
    {
    
    }

    /// <summary>
    /// For migrations
    /// </summary> 
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    public SIDbContext()
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider adding the 'required' modifier or declaring as nullable.
    {
    }
    
    public DbSet<ZUnit> ZUnits { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<TokenStore> TokenStores { get; set; }
    public DbSet<Province> Provinces { get; set; }
    public DbSet<District> Districts { get; set; }
    public DbSet<Ward> Wards { get; set; }
    public DbSet<Activity> Activities { get; set; }
    public DbSet<HttpCommand> HttpCommands { get; set; }
    public DbSet<Notification> Notifications { get; set; }


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var cascadeFKs = modelBuilder.Model
            .GetEntityTypes()
            .SelectMany(t => t.GetForeignKeys())
            .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

        foreach (var fk in cascadeFKs)
            fk.DeleteBehavior = DeleteBehavior.Restrict;
      
        RemovePluralizingTableNameConvention(modelBuilder);

        modelBuilder.ApplyConfiguration(new UnitConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new ProvinceConfiguration());
        modelBuilder.ApplyConfiguration(new DistrictConfiguration());
        modelBuilder.ApplyConfiguration(new WardConfiguration());
        modelBuilder.ApplyConfiguration(new ActivityConfiguration());

        base.OnModelCreating(modelBuilder);
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // dev
        var connectionForMigration = "Server=localhost:3306;Database=si.dev;User=root;Password=Devbyjelly123;";

        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseMySql(connectionForMigration, ServerVersion.AutoDetect(connectionForMigration));
        } 
    }
    private static void RemovePluralizingTableNameConvention(ModelBuilder modelBuilder)
    {
        foreach (IMutableEntityType entity in modelBuilder.Model.GetEntityTypes())
        {
            entity.SetTableName(entity.DisplayName().ToUpper());
        }
    }
}