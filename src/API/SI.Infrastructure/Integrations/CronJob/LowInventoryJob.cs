using CTCore.DynamicQuery.Core.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Quartz;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Infrastructure.Integrations.CronJob;

public class LowInventoryJob(
    IRepository<User> userRepository,
    IRepository<Inventory> inventoryRepository,
    IRepository<Setup> setupRepository,
    IRepository<Notification> notificationRepository,
    IUnitOfWork unitOfWork,
    ILogger<LowInventoryJob> logger) : IJob
{
    public async Task Execute(IJobExecutionContext context)
    {
        var setup = await setupRepository.BuildQuery
            .Select(x => x.MinStockLevel )
            .FirstOrDefaultAsync();
        if (setup == 0)
        {
            logger.LogWarning("Không tìm thấy thiết lập ngưỡng tồn kho thấp");
            return;
        }

        var lowInventoryProducts = await inventoryRepository.BuildQuery
            .Include(x => x.Product)
            .Include(x => x.Warehouse)
            .Where(x => x.Quantity <= setup)
            .ToListAsync();
        if (lowInventoryProducts.Count == 0)
        {
            logger.LogInformation("Không có sản phẩm nào tồn kho thấp hơn ngưỡng cho phép.");
            return;
        }

        foreach (var inv in lowInventoryProducts)
        {
            var userIds = await userRepository.BuildQuery
                .Include(x => x.Employee)
                .Where(x => x.Employee!.WarehouseId == inv.WarehouseId && x.Role == UserRoles.WAREHOUSE_STAFF && x.Employee!.IsManager == true)
                .Select(x => x.Id)
                .ToArrayAsync();

            if (userIds.Length == 0)
            {
                logger.LogWarning($"Không tìm thấy nhân viên kho nào để thông báo cho sản phẩm {inv.Product!.Name} tại kho {inv.Warehouse!.Name}.");
                continue;
            }

            inv.SendNotifLowInventory(inv.Product!.Name, inv.Warehouse!.Name, userIds);
            inv.ModifiedOn = DateTimeOffset.UtcNow;
        }

        var ret = await unitOfWork.SaveChangeAsync();
        if (ret < 0)
        {
            logger.LogWarning($"Failure to saving.");
            return;
        }
    }
}
