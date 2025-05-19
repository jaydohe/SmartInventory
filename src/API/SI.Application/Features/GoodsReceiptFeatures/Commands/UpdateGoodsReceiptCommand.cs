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

public class UpdateGoodsReceiptCommand(string code, UpdateGoodsReceiptArg arg) : ICommand<OkResponse>
{
    public string Code { get; set; } = code;
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
            return CTBaseResult.NotFound("User");
        if (checkUser.Employee.IsManager == false)
            return CTBaseResult.UnProcess("Just manager can access.");

        var checkGoodsReceipt = await goodsReceiptRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Code == request.Code && x.DeletedOn == null, cancellationToken);
        if (checkGoodsReceipt is null)
            return CTBaseResult.NotFound("Goods Receipt");

        if (checkGoodsReceipt.Status == GoodsStatus.CANCELED)
            return CTBaseResult.UnProcess("Goods Receipt has been canceled");

        if (checkGoodsReceipt.Status == GoodsStatus.SUCCESS)
            return CTBaseResult.UnProcess("Goods Receipt has been completed");

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
            .WithMessage("Note must be less than 1024 characters");
    }
}