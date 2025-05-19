using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;
using SI.Domain.Entities.BOM;
using SI.Domain.Entities.ProductionCommands;
using SI.Domain.Enums;

namespace SI.Application.Features.ProductFeatures.Commands;

public class DeleteProductCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteProductCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Product> productRepos,
    IRepository<Inventory> inventRepos,
    IRepository<BillOfMaterial> bomRepos,
    IRepository<ProductionCommand> prodCmdRepos,
    IRepository<Employee> employeeRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<DeleteProductCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
        var role = identifierProvider.Role;
        var employeeId = identifierProvider.EmployeeId;

        if (role is "WAREHOUSE_STAFF")
        {
            var checkManager = await employeeRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == employeeId && x.IsManager == true, cancellationToken);
            if (checkManager is null)
                return CTBaseResult.UnProcess("Just manager can access.");
        }

        var checkProduct = await productRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkProduct is null)
            return CTBaseResult.NotFound("Product");

        var checkInventory = await inventRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.ProductId == checkProduct.Id && x.Quantity > 0 && x.DeletedOn == null, cancellationToken);
        if (checkInventory != null)
            return CTBaseResult.UnProcess("Product is used in Inventory.");

        var checkBOM = await bomRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.ProductId == checkProduct.Id && x.DeletedOn == null, cancellationToken);
        if (checkBOM != null)
            return CTBaseResult.UnProcess("Product is used in BOM.");

        var checkProdCmd = await prodCmdRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == checkProduct.Id && x.DeletedOn == null, cancellationToken);
        if (checkProdCmd != null && (checkProdCmd.Status != CommandStatus.CANCELED || checkProdCmd.Status == CommandStatus.COMPLETED))
            return CTBaseResult.UnProcess("Product is used in Production Command.");

        checkProduct.DeletedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));
        
        return CTBaseResult.Success();
    }
}