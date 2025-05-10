using SI.Domain.Entities;
using SI.Domain.ValueObjeSI.Location;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SI.Domain.Entities.Orders;
using SI.Domain.Entities.GoodsIssues;
using SI.Domain.Entities.GoodsReceipts;
using SI.Domain.Entities.ProductionCommands;
using SI.Domain.Entities.BOM;

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

    public DbSet<Activity> Activities { get; set; }
    public DbSet<Agency> Agencies { get; set; }
    public DbSet<BillOfMaterial> BillOfMaterials { get; set; }
    public DbSet<BillOfMaterialDetail> BillOfMaterialDetails { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Department> Departments { get; set; }
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Forecast> Forecasts { get; set; }
    public DbSet<Inventory> Inventories { get; set; }
    public DbSet<InventoryTransaction> InventoryTransactions { get; set; }
    public DbSet<MaterialSupplier> MaterialSuppliers { get; set; }
    public DbSet<Notification> Notifications { get; set; }
    public DbSet<Position> Positions { get; set; }
    public DbSet<Product> Products { get; set; }
    public DbSet<Setup> Setups { get; set; }
    public DbSet<TokenStore> TokenStores { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Warehouse> Warehouses { get; set; }
    public DbSet<GoodsIssue> GoodsIssues { get; set; }
    public DbSet<GoodsIssueDetail> GoodsIssueDetails { get; set; }
    public DbSet<GoodsReceipt> GoodsReceipts { get; set; }
    public DbSet<GoodsReceiptDetail> GoodsReceiptDetails { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
    public DbSet<ProductionCommand> ProductionCommands { get; set; }
    public DbSet<ProductionCommandDetail> ProductionCommandDetails { get; set; }
    public DbSet<ProductionCommandProcess> ProductionCommandProcesses { get; set; }
    public DbSet<Province> Provinces { get; set; }
    public DbSet<District> Districts { get; set; }
    public DbSet<Ward> Wards { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var cascadeFKs = modelBuilder.Model
            .GetEntityTypes()
            .SelectMany(t => t.GetForeignKeys())
            .Where(fk => !fk.IsOwnership && fk.DeleteBehavior == DeleteBehavior.Cascade);

        foreach (var fk in cascadeFKs)
            fk.DeleteBehavior = DeleteBehavior.Restrict;
      
        RemovePluralizingTableNameConvention(modelBuilder);

        modelBuilder.ApplyConfiguration(new ActivityConfiguration());
        modelBuilder.ApplyConfiguration(new AgencyConfiguration());
        modelBuilder.ApplyConfiguration(new BillOfMaterialConfiguration());
        modelBuilder.ApplyConfiguration(new CategoryConfiguration());
        modelBuilder.ApplyConfiguration(new DepartmentConfiguration());
        modelBuilder.ApplyConfiguration(new EmployeeConfiguration());
        modelBuilder.ApplyConfiguration(new MaterialSupplierConfiguration());
        modelBuilder.ApplyConfiguration(new PositionConfiguration());
        modelBuilder.ApplyConfiguration(new ProductConfiguration());
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new WarehouseConfiguration());
        modelBuilder.ApplyConfiguration(new GoodsIssueConfiguration());
        modelBuilder.ApplyConfiguration(new GoodsReceiptConfiguration());
        modelBuilder.ApplyConfiguration(new OrderConfiguration());
        modelBuilder.ApplyConfiguration(new ProductionCommandConfiguration());
        modelBuilder.ApplyConfiguration(new ProvinceConfiguration());
        modelBuilder.ApplyConfiguration(new DistrictConfiguration());
        modelBuilder.ApplyConfiguration(new WardConfiguration());

        base.OnModelCreating(modelBuilder);
    }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // dev
        var connectionForMigration = "Server=18.142.46.87;Database=SmartInventory;User=root;Password=Devbyjelly@123;";

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