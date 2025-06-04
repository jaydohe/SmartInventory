using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;

namespace SI.Application.Features.WarehouseFeatures.Commands;

public class DeleteWarehouseCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteWarehouseCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Warehouse> wareRepos,
    IRepository<Employee> employeeRepos) : ICommandHandler<DeleteWarehouseCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteWarehouseCommand request, CancellationToken cancellationToken)
    {
        var checkWare = await wareRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkWare is null)
            return CTBaseResult.NotFound("Kho, bãi");

        var checkMasterWare = await wareRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == checkWare.WarehouseId && x.DeletedOn == null, cancellationToken);
        if (checkMasterWare != null)
            return CTBaseResult.UnProcess("Kho cha đang được dùng tại kho con.");

        var checkEmployee = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.WarehouseId == checkWare.Id && x.DeletedOn == null, cancellationToken);
        if (checkEmployee != null)
            return CTBaseResult.UnProcess("Nhân viên vẫn còn trong kho.");

        checkWare.DeletedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}