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

public class CreateMaterialSupplierCommand(CreateMaterialSupplierArg arg) : ICommand<OkResponse>
{
    public CreateMaterialSupplierArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateMaterialSupplierCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateMaterialSupplierCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<MaterialSupplier> materialSupplierRepos) : ICommandHandler<CreateMaterialSupplierCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateMaterialSupplierCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkExist = await materialSupplierRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExist != null)
            return CTBaseResult.UnProcess("Material Supplier name already exists.");

        var checkMaterialSupplier = await materialSupplierRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.TaxCode == request.Arg.TaxCode && x.DeletedOn == null, cancellationToken);
        if (checkMaterialSupplier != null)
            return CTBaseResult.UnProcess("Material Supplier tax code already exists.");

        var newMaterialSupplier = new MaterialSupplier
        {
            Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name),
            Name = request.Arg.Name,
            Representative = request.Arg.Representative,
            TaxCode = request.Arg.TaxCode,
            PhoneNumber = request.Arg.PhoneNumber,
            BusinessItem = request.Arg.BusinessItem,
            Email = request.Arg.Email,
            Address = request.Arg.Address,
            Note = request.Arg.Note
        };
        materialSupplierRepos.Add(newMaterialSupplier);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateMaterialSupplierCommandValidator : AbstractValidator<CreateMaterialSupplierCommand>
{
    public CreateMaterialSupplierCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(1024)
            .WithMessage("Name is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Representative)
            .NotEmpty()
            .WithMessage("Representative is required.")
            .MaximumLength(512)
            .WithMessage("Representative is too long. Only up to 512 characters.");
        RuleFor(x => x.Arg.TaxCode)
            .MaximumLength(100)
            .WithMessage("TaxCode is too long. Only up to 100 characters.");
        RuleFor(x => x.Arg.PhoneNumber)
            .NotEmpty()
            .WithMessage("PhoneNumber is required.")
            .MaximumLength(20)
            .WithMessage("PhoneNumber is too long. Only up to 20 characters.");
        RuleFor(x => x.Arg.BusinessItem)
            .NotEmpty()
            .WithMessage("BusinessItem is required.")
            .MaximumLength(1024)
            .WithMessage("BusinessItem is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Email)
            .NotEmpty()
            .WithMessage("Email is required.")
            .MaximumLength(512)
            .WithMessage("Email is too long. Only up to 512 characters.");
        RuleFor(x => x.Arg.Address)
            .NotEmpty()
            .WithMessage("Address is required.")
            .MaximumLength(1024)
            .WithMessage("Address is too long. Only up to 1024 characters.");
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Note is too long. Only up to 1024 characters.");
    }
}