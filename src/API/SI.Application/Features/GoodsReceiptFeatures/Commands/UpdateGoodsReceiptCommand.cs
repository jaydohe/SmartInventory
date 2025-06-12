using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.GoodsReceiptContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;
using SI.Domain.Entities.GoodsReceipts;
using SI.Domain.Enums;

namespace SI.Application.Features.GoodsReceiptFeatures.Commands;

public class UpdateGoodsReceiptCommand(string id, UpdateGoodsReceiptArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateGoodsReceiptArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateGoodsReceiptCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateGoodsReceiptCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<GoodsReceipt> goodsReceiptRepos,
    IRepository<User> userRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<UpdateGoodsReceiptCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateGoodsReceiptCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;

        var checkUser = await userRepos.BuildQuery
            .Include(x => x.Employee)
            .FirstOrDefaultAsync(x => x.Id == userId && x.DeletedOn == null, cancellationToken);
        if (checkUser is null)
            return CTBaseResult.NotFound("Người dùng");
        if (checkUser.Employee.IsManager == false)
            return CTBaseResult.UnProcess("Chỉ có quản lý được truy cập.");

        var checkGoodsReceipt = await goodsReceiptRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkGoodsReceipt is null)
            return CTBaseResult.NotFound("Phiếu nhập hàng");

        if (checkGoodsReceipt.Status == GoodsStatus.CANCELED)
            return CTBaseResult.UnProcess("Phiếu nhập hàng đã hủy.");

        if (checkGoodsReceipt.Status == GoodsStatus.SUCCESS)
            return CTBaseResult.UnProcess("Phiếu nhập hàng đã hoàn thành.");

        checkGoodsReceipt.Status = request.Arg.Status ?? checkGoodsReceipt.Status;
        checkGoodsReceipt.Note = request.Arg.Note ?? checkGoodsReceipt.Note;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateGoodsReceiptCommandValidator : AbstractValidator<UpdateGoodsReceiptCommand>
{
    public UpdateGoodsReceiptCommandValidator()
    {
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Ghi chú tối đa 1024 ký tự.");
    }
}