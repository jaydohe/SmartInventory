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

public class UpdateAgencyCommand(string id, UpdateAgencyArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateAgencyArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateAgencyCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateAgencyCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Agency> agencyRepos) : ICommandHandler<UpdateAgencyCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateAgencyCommand request, CancellationToken cancellationToken)
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
        if (request.Arg.Email != null && request.Arg.Email.Trim() == "")
            return CTBaseResult.UnProcess("Email cannot consist only of whitespace.");
        if (request.Arg.Address != null && request.Arg.Address.Trim() == "")
            return CTBaseResult.UnProcess("Address cannot consist only of whitespace.");
        if (request.Arg.Note != null && request.Arg.Note.Trim() == "")
            return CTBaseResult.UnProcess("Note cannot consist only of whitespace.");

        var checkAgency = await agencyRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkAgency is null)
            return CTBaseResult.NotFound("Agency");

        var checkExist = await agencyRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExist != null)
            return CTBaseResult.UnProcess("Agency name already exists.");

        checkAgency.WardId = request.Arg.WardId ?? checkAgency.WardId;
        checkAgency.DistrictId = request.Arg.DistrictId ?? checkAgency.DistrictId;
        checkAgency.ProvinceId = request.Arg.ProvinceId ?? checkAgency.ProvinceId;
        if (request.Arg.Name != null)
        {
            checkAgency.Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name);
        }
        checkAgency.Name = request.Arg.Name ?? checkAgency.Name;
        checkAgency.Representative = request.Arg.Representative ?? checkAgency.Representative;
        checkAgency.PhoneNumber = request.Arg.PhoneNumber ?? checkAgency.PhoneNumber;
        checkAgency.Email = request.Arg.Email ?? checkAgency.Email;
        checkAgency.Address = request.Arg.Address ?? checkAgency.Address;
        checkAgency.CurrentDebt = request.Arg.CurrentDebt ?? 0;
        checkAgency.Note = request.Arg.Note;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateAgencyCommandValidator : AbstractValidator<UpdateAgencyCommand>
{
    public UpdateAgencyCommandValidator()
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