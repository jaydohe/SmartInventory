﻿using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities.ProductionCommands;
using SI.Domain.Enums;

namespace SI.Application.Features.ProductionCommandFeatures.Commands;

public class DeleteProductionCommandCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteProductionCommandCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<ProductionCommand> productionCommandRepos,
    IRepository<ProductionCommandDetail> productionCommandDetailRepos,
    IRepository<ProductionCommandProcess> productionCommandProcessRepos) : ICommandHandler<DeleteProductionCommandCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteProductionCommandCommand request, CancellationToken cancellationToken)
    {
        var checkProductionCommand = await productionCommandRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkProductionCommand is null)
            return CTBaseResult.NotFound("Lệnh sản xuất");
        if (checkProductionCommand.Status != CommandStatus.CREATED)
            return CTBaseResult.UnProcess("Trạng thái lệnh sản xuất phải là mới khởi tạo, mới xóa được.");

        var checkProductionCommandDetail = await productionCommandDetailRepos.BuildQuery
            .Where(x => x.ProductionCommandId == request.Id && x.DeletedOn == null)
            .FirstOrDefaultAsync(cancellationToken);
        if (checkProductionCommandDetail is null)
            return CTBaseResult.NotFound("Chi tiết của lệnh sản xuất");

        var checkProductionCommandProcess = await productionCommandProcessRepos.BuildQuery
            .Where(x => x.ProductionCommandId == request.Id && x.DeletedOn == null)
            .FirstOrDefaultAsync(cancellationToken);
        if (checkProductionCommandProcess is null)
            return CTBaseResult.NotFound("Phân công của lệnh sản xuất");

        checkProductionCommandProcess.DeletedOn = DateTimeOffset.UtcNow;
        checkProductionCommandDetail.DeletedOn = DateTimeOffset.UtcNow;
        checkProductionCommand.DeletedOn = DateTimeOffset.UtcNow;
        checkProductionCommand.Status = CommandStatus.CANCELED;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}