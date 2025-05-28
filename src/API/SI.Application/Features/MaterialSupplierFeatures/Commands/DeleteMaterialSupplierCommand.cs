using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;

namespace SI.Application.Features.MaterialSupplierFeatures.Commands;

public class DeleteMaterialSupplierCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteMaterialSupplierCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<MaterialSupplier> materialSupplierRepos) : ICommandHandler<DeleteMaterialSupplierCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteMaterialSupplierCommand request, CancellationToken cancellationToken)
    {
        var checkMaterialSupplier = await materialSupplierRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkMaterialSupplier is null)
            return CTBaseResult.NotFound("Nhà cung cấp NVL");

        checkMaterialSupplier.DeletedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}