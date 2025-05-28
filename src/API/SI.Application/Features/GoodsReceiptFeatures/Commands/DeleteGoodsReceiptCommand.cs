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
            return CTBaseResult.NotFound("Phiếu nhập hàng");
        if (checkGoodsReceipt.Status != GoodsStatus.CANCELED)
            return CTBaseResult.UnProcess("Trạng thái của phiếu nhập hàng không phải là hủy.");

        if (checkGoodsReceipt.User.Employee.IsManager == false &&
            checkGoodsReceipt.Status == GoodsStatus.CANCELED &&
            checkGoodsReceipt.UserId != userId)
            return CTBaseResult.UnProcess("Phiếu nhập hàng không phải do bạn tạo.");

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