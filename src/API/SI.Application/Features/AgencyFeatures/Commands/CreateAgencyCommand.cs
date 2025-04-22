using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.AgencyContract;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;

namespace SI.Application.Features.AgencyFeatures.Commands;

public class CreateAgencyCommand(CreateAgencyArg arg) : ICommand<OkResponse>
{
    public CreateAgencyArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateAgencyCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateAgencyCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Agency> agencyRepos) : ICommandHandler<CreateAgencyCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateAgencyCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkExist = await agencyRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExist != null)
            return CTBaseResult.UnProcess("Agency name already exists.");

        var checkAgency = await agencyRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.TaxCode == request.Arg.TaxCode && x.DeletedOn == null, cancellationToken);
        if (checkAgency != null)
            return CTBaseResult.UnProcess("Agency tax code already exists.");

        var newAgency = new Agency
        {
            WardId = request.Arg.WardId,
            DistrictId = request.Arg.DistrictId,
            ProvinceId = request.Arg.ProvinceId,
            Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name),
            Name = request.Arg.Name,
            Representative = request.Arg.Representative,
            TaxCode = request.Arg.TaxCode,
            PhoneNumber = request.Arg.PhoneNumber,
            Email = request.Arg.Email,
            Address = request.Arg.Address,
            CurrentDebt = request.Arg.CurrentDebt ?? 0,
            Note = request.Arg.Note
        };
        agencyRepos.Add(newAgency);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateAgencyCommandValidator : AbstractValidator<CreateAgencyCommand>
{
    public CreateAgencyCommandValidator()
    {
        RuleFor(x => x.Arg.WardId)
            .NotEmpty()
            .WithMessage("WardId is required.");
        RuleFor(x => x.Arg.DistrictId)
            .NotEmpty()
            .WithMessage("DistrictId is required.");
        RuleFor(x => x.Arg.ProvinceId)
            .NotEmpty()
            .WithMessage("ProvinceId is required.");
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