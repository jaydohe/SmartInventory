using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.ProductionCommandContract;
using SI.Domain.Entities.ProductionCommands;
using SI.Domain.Enums;

namespace SI.Application.Features.ProductionCommandFeatures.Commands;

public class UpdateProductionStatusCommand(string id, UpdateProductionStatusArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateProductionStatusArg Arg { get; set; } = arg;
}

public class UpdateProductionStatusCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<ProductionCommand> productionCommandRepos) : ICommandHandler<UpdateProductionStatusCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateProductionStatusCommand request, CancellationToken cancellationToken)
    {
        var checkProductionCommand = await productionCommandRepos.BuildQuery
            .Include(x => x.Processes)
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkProductionCommand is null)
            return CTBaseResult.NotFound("Lệnh sản xuất");
        if (request.Arg.Status == CommandStatus.COMPLETED && checkProductionCommand.Processes.Any(x => x.ProductionCommandId == request.Id && x.Status != ProcessProductionStatus.COMPLETED))
            return CTBaseResult.UnProcess("Lệnh sản xuất chưa hoàn thành.");
        if (request.Arg.Status == CommandStatus.CANCELED && checkProductionCommand.Processes.Any(x => x.ProductionCommandId == request.Id && x.Percentage <= 0))
            return CTBaseResult.UnProcess("Lệnh sản xuất đang tiến hành không thể hủy.");

        checkProductionCommand.Status = request.Arg.Status;
        checkProductionCommand.ModifiedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}