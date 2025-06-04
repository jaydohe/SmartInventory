using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities.BOM;

namespace SI.Application.Features.BOMFeatures.Commands;

public class DeleteBOMCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteBOMCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<BillOfMaterial> bomRepos,
    IRepository<BillOfMaterialDetail> bomDetailRepos) : ICommandHandler<DeleteBOMCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteBOMCommand request, CancellationToken cancellationToken)
    {
        var checkBOMDetails = await bomDetailRepos.BuildQuery
            .Where(x => x.BillOfMaterialId == request.Id && x.DeletedOn == null)
            .ToListAsync(cancellationToken);
        if ( checkBOMDetails.Count == 0)
            return CTBaseResult.NotFound("Chi tiết định mức NVL");

        foreach (var item in checkBOMDetails)
        {
            bomDetailRepos.Remove(item);
        }

        var checkBOM = await bomRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkBOM is null)
            return CTBaseResult.NotFound("Định mức NVL");

        bomRepos.Remove(checkBOM);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));
        return CTBaseResult.Success();
    }
}