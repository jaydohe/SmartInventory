using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.BOMContract;
using SI.Domain.Common.Authenticate;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;
using SI.Domain.Entities.BOM;

namespace SI.Application.Features.BOMFeatures.Commands;

public class CreateBOMCommand(CreateBOMArg arg) : ICommand<OkResponse>
{
    public CreateBOMArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateBOMCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateBOMCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<BillOfMaterial> bomRepos,
    IRepository<BillOfMaterialDetail> bomDetailRepos,
    IRepository<Product> prodRepos,
    IUserIdentifierProvider identifierProvider) : ICommandHandler<CreateBOMCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateBOMCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var userId = identifierProvider.UserId;

        var checkProduct = await prodRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Arg.ProductId && x.DeletedOn == null, cancellationToken);
        if (checkProduct is null)
            return CTBaseResult.NotFound("Hàng hóa");
        if (checkProduct.MaterialSupplierId != null)
            return CTBaseResult.UnProcess("Nguyên vật liệu không phải hàng hóa.");

        var newBOM = new BillOfMaterial
        {
            ProductId = request.Arg.ProductId,
            Code = CodeGenerationUtils.GenerateCodeFromName("Định mức" + checkProduct.Name)
        };
        bomRepos.Add(newBOM);

        foreach (var item in request.Arg.BOMDetails)
        {
            var checkMaterial = await prodRepos.BuildQuery
                .FirstOrDefaultAsync(x => x.Id == item.MaterialId && x.DeletedOn == null, cancellationToken);
            if (checkMaterial is null)
                return CTBaseResult.NotFound("Nguyên vật liệu");
            if (checkMaterial.MaterialSupplierId == null)
                return CTBaseResult.UnProcess("Hàng hóa không phải nguyên vật liệu.");

            var newBOMDetail = new BillOfMaterialDetail
            {
                BillOfMaterialId = newBOM.Id,
                MaterialId = item.MaterialId,
                Quantity = item.Quantity,
                Unit = checkMaterial.Unit
            };
            bomDetailRepos.Add(newBOMDetail);
        }

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateBOMCommandValidator : AbstractValidator<CreateBOMCommand>
{
    public CreateBOMCommandValidator()
    {
        RuleFor(x => x.Arg.ProductId)
            .NotEmpty()
            .WithMessage("Hàng hóa là bắt buộc.");
        RuleFor(x => x.Arg.BOMDetails)
            .NotEmpty()
            .WithMessage("Chi tiết định mức nguyên vật liệu là bắt buộc.");
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
