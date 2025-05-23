using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Hybrid;
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
            return CTBaseResult.UnProcess("Đại lý đã tồn tại.");

        var checkAgency = await agencyRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.TaxCode == request.Arg.TaxCode && x.DeletedOn == null, cancellationToken);
        if (checkAgency != null)
            return CTBaseResult.UnProcess("Mã số thuế của đại lý đã tồn tại.");

        var newAgency = new Agency
        {
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
        RuleFor(x => x.Arg.Name)
            .NotEmpty()
            .WithMessage("Tên là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Tên tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Representative)
            .NotEmpty()
            .WithMessage("Người đại diện là bắt buộc.")
            .MaximumLength(512)
            .WithMessage("Người đại diện tối đa 512 ký tự.");
        RuleFor(x => x.Arg.TaxCode)
            .MaximumLength(100)
            .WithMessage("Mã số thuế tối đa 100 ký tự.");
        RuleFor(x => x.Arg.PhoneNumber)
            .NotEmpty()
            .WithMessage("Số điện thoại là bắt buộc.")
            .MaximumLength(20)
            .WithMessage("Số điện thoại tối đa 20 ký tự.");
        RuleFor(x => x.Arg.Email)
            .NotEmpty()
            .WithMessage("Email là bắt buộc.")
            .MaximumLength(512)
            .WithMessage("Email tối đa 512 ký tự.");
        RuleFor(x => x.Arg.Address)
            .NotEmpty()
            .WithMessage("Địa chỉ là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Địa chỉ tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Ghi chú tối đa 1024 ký tự.");
    }
}