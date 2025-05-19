using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities.GoodsReceipts;
using SI.Domain.Enums;

namespace SI.Application.Features.GoodsReceiptFeatures.Commands;

public class DeleteGoodsReceiptCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteGoodsReceiptCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<GoodsReceipt> goodsReceiptRepos,
    IRepository<GoodsReceiptDetail> goodsReceiptDetailRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<DeleteGoodsReceiptCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteGoodsReceiptCommand request, CancellationToken cancellationToken)
    {
        var userId = identifierProvider.UserId;

        var checkGoodsReceipt = await goodsReceiptRepos.BuildQuery
            .Include(x => x.User)
            .ThenInclude(x => x.Employee)
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkGoodsReceipt is null)
            return CTBaseResult.NotFound("Goods Receipt");
        if (checkGoodsReceipt.Status != GoodsStatus.CANCELED)
            return CTBaseResult.UnProcess("Goods Receipt is not CANCELED, so can not delete.");

        if (checkGoodsReceipt.User.Employee.IsManager == false &&
            checkGoodsReceipt.Status == GoodsStatus.CANCELED &&
            checkGoodsReceipt.UserId != userId)
            return CTBaseResult.UnProcess("Goods Receipt is not your created, so can not delete.");

        var checkGoodsReceiptDetail = await goodsReceiptDetailRepos.BuildQuery
            .Where(x => x.GoodsReceiptId == checkGoodsReceipt.Id && x.DeletedOn == null)
            .ToListAsync(cancellationToken);
        if (checkGoodsReceiptDetail != null)
        {
            foreach (var item in checkGoodsReceiptDetail)
            {
                goodsReceiptDetailRepos.Remove(item);
            }
        }
        goodsReceiptRepos.Remove(checkGoodsReceipt);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}