using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.MaterialSupplierContract;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;

namespace SI.Application.Features.MaterialSupplierFeatures.Commands;

public class UpdateMaterialSupplierCommand(string id, UpdateMaterialSupplierArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateMaterialSupplierArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateMaterialSupplierCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateMaterialSupplierCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<MaterialSupplier> materialSupplierRepos) : ICommandHandler<UpdateMaterialSupplierCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateMaterialSupplierCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        if (request.Arg.Name != null && request.Arg.Name.Trim() == "")
            return CTBaseResult.UnProcess("Name cannot consist only of whitespace.");
        if (request.Arg.Representative != null && request.Arg.Representative.Trim() == "")
            return CTBaseResult.UnProcess("Representative cannot consist only of whitespace.");
        if (request.Arg.PhoneNumber != null && request.Arg.PhoneNumber.Trim() == "")
            return CTBaseResult.UnProcess("Phone Number cannot consist only of whitespace.");
        if (request.Arg.BusinessItem != null && request.Arg.BusinessItem.Trim() == "")
            return CTBaseResult.UnProcess("Business Item cannot consist only of whitespace.");
        if (request.Arg.Email != null && request.Arg.Email.Trim() == "")
            return CTBaseResult.UnProcess("Email cannot consist only of whitespace.");
        if (request.Arg.Address != null && request.Arg.Address.Trim() == "")
            return CTBaseResult.UnProcess("Address cannot consist only of whitespace.");
        if (request.Arg.Note != null && request.Arg.Note.Trim() == "")
            return CTBaseResult.UnProcess("Note cannot consist only of whitespace.");

        var checkMaterialSupplier = await materialSupplierRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkMaterialSupplier is null)
            return CTBaseResult.NotFound("Material Supplier");

        var checkExist = await materialSupplierRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExist != null)
            return CTBaseResult.UnProcess("Material Supplier name already exists.");

        checkMaterialSupplier.WardId = request.Arg.WardId ?? checkMaterialSupplier.WardId;
        checkMaterialSupplier.DistrictId = request.Arg.DistrictId ?? checkMaterialSupplier.DistrictId;
        checkMaterialSupplier.ProvinceId = request.Arg.ProvinceId ?? checkMaterialSupplier.ProvinceId;
        if (request.Arg.Name != null)
        {
            checkMaterialSupplier.Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name);
        }
        checkMaterialSupplier.Name = request.Arg.Name ?? checkMaterialSupplier.Name;
        checkMaterialSupplier.Representative = request.Arg.Representative ?? checkMaterialSupplier.Representative;
        checkMaterialSupplier.PhoneNumber = request.Arg.PhoneNumber ?? checkMaterialSupplier.PhoneNumber;
        checkMaterialSupplier.BusinessItem = request.Arg.BusinessItem ?? checkMaterialSupplier.BusinessItem;
        checkMaterialSupplier.Email = request.Arg.Email ?? checkMaterialSupplier.Email;
        checkMaterialSupplier.Address = request.Arg.Address ?? checkMaterialSupplier.Address;
        checkMaterialSupplier.CurrentDebt = request.Arg.CurrentDebt ?? checkMaterialSupplier.CurrentDebt;
        checkMaterialSupplier.Note = request.Arg.Note ?? checkMaterialSupplier.Note;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateMaterialSupplierCommandValidator : AbstractValidator<UpdateMaterialSupplierCommand>
{
    public UpdateMaterialSupplierCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .MaximumLength(1024)
            .WithMessage("Name is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Representative)
            .MaximumLength(512)
            .WithMessage("Representative is too long. Only up to 512 characters.");
        RuleFor(x => x.Arg.PhoneNumber)
            .MaximumLength(20)
            .WithMessage("PhoneNumber is too long. Only up to 20 characters.");
        RuleFor(x => x.Arg.BusinessItem)
            .MaximumLength(1024)
            .WithMessage("BusinessItem is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Email)
            .MaximumLength(512)
            .WithMessage("Email is too long. Only up to 512 characters.");
        RuleFor(x => x.Arg.Address)
            .MaximumLength(1024)
            .WithMessage("Address is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.CurrentDebt)
            .GreaterThanOrEqualTo(0)
            .WithMessage("CurrentDebt must be greater than or equal to 0.");
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Note is too long. Only up to 1024 characters.");
    }
}