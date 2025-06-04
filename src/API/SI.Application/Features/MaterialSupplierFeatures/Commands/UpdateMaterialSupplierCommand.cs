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
            return CTBaseResult.UnProcess("Tên đại lý không được chỉ bao gồm khoảng trắng.");
        if (request.Arg.Representative != null && request.Arg.Representative.Trim() == "")
            return CTBaseResult.UnProcess("Người đại diện không được chỉ bao gồm khoảng trắng.");
        if (request.Arg.PhoneNumber != null && request.Arg.PhoneNumber.Trim() == "")
            return CTBaseResult.UnProcess("Số điện thoại không được chỉ bao gồm khoảng trắng.");
        if (request.Arg.BusinessItem != null && request.Arg.BusinessItem.Trim() == "")
            return CTBaseResult.UnProcess("Sản phẩm kinh doanh không được chỉ bao gồm khoảng trắng.");
        if (request.Arg.Email != null && request.Arg.Email.Trim() == "")
            return CTBaseResult.UnProcess("Email không được chỉ bao gồm khoảng trắng.");
        if (request.Arg.Address != null && request.Arg.Address.Trim() == "")
            return CTBaseResult.UnProcess("Địa chỉ không được chỉ bao gồm khoảng trắng.");
        if (request.Arg.Note != null && request.Arg.Note.Trim() == "")
            return CTBaseResult.UnProcess("Ghi chú không được chỉ bao gồm khoảng trắng.");

        var checkMaterialSupplier = await materialSupplierRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkMaterialSupplier is null)
            return CTBaseResult.NotFound("Nhà cung cấp NVL");

        var checkExist = await materialSupplierRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExist != null)
            return CTBaseResult.UnProcess("Tên nhà cung cấp NVL đã tồn tại.");

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
            .WithMessage("Tên tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Representative)
            .MaximumLength(512)
            .WithMessage("Người đại diện tối đa 512 ký tự.");
        RuleFor(x => x.Arg.PhoneNumber)
            .MaximumLength(20)
            .WithMessage("Số điện thoại tối đa 20 ký tự.");
        RuleFor(x => x.Arg.BusinessItem)
            .MaximumLength(1024)
            .WithMessage("Sản phẩm kinh doanh tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.Email)
            .MaximumLength(512)
            .WithMessage("Email tối đa 512 ký tự.");
        RuleFor(x => x.Arg.Address)
            .MaximumLength(1024)
            .WithMessage("Địa chỉ tối đa 1024 ký tự.");
        RuleFor(x => x.Arg.CurrentDebt)
            .GreaterThanOrEqualTo(0)
            .WithMessage("Công nợ phải lớn hơn hoặc bằng 0.");
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Ghi chú tối đa 1024 ký tự.");
    }
}