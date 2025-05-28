using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.BOMContract;
using SI.Domain.Entities;
using SI.Domain.Entities.BOM;

namespace SI.Application.Features.BOMFeatures.Commands;

public class UpdateBOMCommand(string id, UpdateBOMArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateBOMArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateBOMCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateBOMCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<BillOfMaterial> bomRepos,
    IRepository<BillOfMaterialDetail> bomDetailRepos,
    IRepository<Product> materialRepos) : ICommandHandler<UpdateBOMCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateBOMCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkBOM = await bomRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkBOM is null)
            return CTBaseResult.NotFound("Định mức");

        var existingDetails = await bomDetailRepos.BuildQuery
            .Where(x => x.BillOfMaterialId == checkBOM.Id && x.DeletedOn == null)
            .ToListAsync(cancellationToken);
        foreach (var detail in existingDetails)
        {
            bomDetailRepos.Remove(detail);
        }

        var materialIds = request.Arg.BOMDetails
                               .Select(d => d.MaterialId)
                               .ToList();

        var checkMaterial = await materialRepos.BuildQuery
            .Where(x => materialIds.Contains(x.Id) && x.DeletedOn == null)
            .FirstOrDefaultAsync(cancellationToken);
        if (checkMaterial is null)
            return CTBaseResult.NotFound("Nguyên vật liệu");

        foreach (var item in request.Arg.BOMDetails)
        {
            var newDetail = new BillOfMaterialDetail
            {
                BillOfMaterialId = checkBOM.Id,
                MaterialId = item.MaterialId,
                Quantity = item.Quantity,
                Unit = checkMaterial.Unit
            };
            bomDetailRepos.Add(newDetail);
        }

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateBOMCommandValidator : AbstractValidator<UpdateBOMCommand>
{
    public UpdateBOMCommandValidator()
    {
        RuleForEach(x => x.Arg.BOMDetails)
            .ChildRules(bomDetail =>
            {
                bomDetail.RuleFor(x => x.MaterialId)
                    .NotEmpty()
                    .WithMessage("Nguyên vật liệu là bắt buộc.");
                bomDetail.RuleFor(x => x.Quantity)
                    .GreaterThan(0)
                    .WithMessage("Số lượng phải lớn hơn 0.");
            });
    }
}