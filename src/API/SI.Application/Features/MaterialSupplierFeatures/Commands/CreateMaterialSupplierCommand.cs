﻿using CTCore.DynamicQuery.Core.Domain.Interfaces;
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
            return CTBaseResult.UnProcess("Tên nhà cung cấp NVL đã tồn tại.");

        var checkMaterialSupplier = await materialSupplierRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.TaxCode == request.Arg.TaxCode && x.DeletedOn == null, cancellationToken);
        if (checkMaterialSupplier != null)
            return CTBaseResult.UnProcess("Mã số thuế của nhà cung cấp NVL đã tồn tại.");

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
        RuleFor(x => x.Arg.BusinessItem)
            .NotEmpty()
            .WithMessage("Sản phẩm kinh doanh là bắt buộc.")
            .MaximumLength(1024)
            .WithMessage("Sản phẩm kinh doanh tối đa 1024 ký tự.");
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