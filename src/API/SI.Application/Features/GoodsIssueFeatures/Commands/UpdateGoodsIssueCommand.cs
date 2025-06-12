using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.GoodsIssueContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities.GoodsIssues;
using SI.Domain.Enums;

namespace SI.Application.Features.GoodsIssueFeatures.Commands;

public class UpdateGoodsIssueCommand(string id, UpdateGoodsIssueArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateGoodsIssueArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateGoodsIssueCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateGoodsIssueCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<GoodsIssue> goodsIssueRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<UpdateGoodsIssueCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateGoodsIssueCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;

        var checkGoodsIssue = await goodsIssueRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkGoodsIssue is null)
            return CTBaseResult.NotFound("Phiếu xuất hàng");
        if (checkGoodsIssue.Status == GoodsStatus.CANCELED)
            return CTBaseResult.UnProcess("Phiếu xuất hàng đã hủy.");
        if (checkGoodsIssue.Status == GoodsStatus.SUCCESS)
            return CTBaseResult.UnProcess("Phiếu xuất hàng đã hoàn thành.");

        if (request.Arg.Status == GoodsStatus.CREATED)
            return CTBaseResult.UnProcess("Phiếu xuất hàng đã được tạo.");

        checkGoodsIssue.Status = request.Arg.Status ?? checkGoodsIssue.Status;
        checkGoodsIssue.Note = request.Arg.Note ?? checkGoodsIssue.Note;
        
        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateGoodsIssueCommandValidator : AbstractValidator<UpdateGoodsIssueCommand>
{
    public UpdateGoodsIssueCommandValidator()
    {
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Ghi chú tối đa 1024 ký tự.");
    }
}