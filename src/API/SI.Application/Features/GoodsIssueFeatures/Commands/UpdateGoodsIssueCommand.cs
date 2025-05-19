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

public class UpdateGoodsIssueCommand(string code, UpdateGoodsIssueArg arg) : ICommand<OkResponse>
{
    public string Code { get; set; } = code;
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
                .FirstOrDefaultAsync(x => x.Code == request.Code && x.DeletedOn == null, cancellationToken);
        if (checkGoodsIssue is null)
            return CTBaseResult.NotFound("Goods Issue");
        if (checkGoodsIssue.Status == GoodsStatus.CANCELED)
            return CTBaseResult.UnProcess("Goods Issue has been canceled.");
        if (checkGoodsIssue.Status == GoodsStatus.SUCCESS)
            return CTBaseResult.UnProcess("Goods Issue has been completed.");

        if (request.Arg.Status == GoodsStatus.CREATED)
            return CTBaseResult.UnProcess("Goods Issue has been created.");

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
            .WithMessage("Note must be less than 1024 characters.");
    }
}