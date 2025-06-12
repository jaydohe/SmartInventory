using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities.GoodsIssues;
using SI.Domain.Enums;

namespace SI.Application.Features.GoodsIssueFeatures.Commands;

public class DeleteGoodsIssueCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteGoodsIssueCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<GoodsIssue> goodsIssueRepos,
    IRepository<GoodsIssueDetail> goodsIssueDetailRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<DeleteGoodsIssueCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteGoodsIssueCommand request, CancellationToken cancellationToken)
    {
        var userId = identifierProvider.UserId;

        var checkGoodsIssue = await goodsIssueRepos.BuildQuery
            .Include(x => x.User)
            .ThenInclude(x => x.Employee)
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkGoodsIssue is null)
            return CTBaseResult.NotFound("Phiếu xuất hàng");
        if (checkGoodsIssue.Status != GoodsStatus.CANCELED)
            return CTBaseResult.UnProcess("Trạng thái của phiếu xuất hàng không phải là hủy.");


        if (checkGoodsIssue.User.Employee.IsManager == false &&
            checkGoodsIssue.Status == GoodsStatus.CANCELED &&
            checkGoodsIssue.UserId != userId)
            return CTBaseResult.UnProcess("Phiếu xuất hàng không phải do bạn tạo.");

        var checkGoodsIssueDetail = await goodsIssueDetailRepos.BuildQuery
            .Where(x => x.GoodsIssueId == checkGoodsIssue.Id && x.DeletedOn == null)
            .ToListAsync(cancellationToken);
        if (checkGoodsIssueDetail != null)
        {
            foreach (var item in checkGoodsIssueDetail)
            {
                goodsIssueDetailRepos.Remove(item);
            }
        }
        goodsIssueRepos.Remove(checkGoodsIssue);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}