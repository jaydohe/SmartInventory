using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.WarehouseFeatures.Commands;

public class DeleteWarehouseCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteWarehouseCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Warehouse> wareRepos,
    IRepository<Employee> employeeRepos,
    IRepository<Product> prodRepos) : ICommandHandler<DeleteWarehouseCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteWarehouseCommand request, CancellationToken cancellationToken)
    {
        var checkWare = await wareRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkWare is null)
            return CTBaseResult.NotFound("Warehouse");

        var checkMasterWare = await wareRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == checkWare.WarehouseId && x.DeletedOn == null, cancellationToken);
        if (checkMasterWare != null)
            return CTBaseResult.UnProcess("Master Warehouse is used in Slave Warehouse.");

        var checkEmployee = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.WarehouseId == checkWare.Id && x.DeletedOn == null, cancellationToken);
        if (checkEmployee != null)
            return CTBaseResult.UnProcess("Warehouse is used in Employee");

        var checkProd = await prodRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.WarehouseId == checkWare.Id && x.DeletedOn == null, cancellationToken);
        if (checkProd != null)
            return CTBaseResult.UnProcess("Warehouse is used in Product");

        checkWare.DeletedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}