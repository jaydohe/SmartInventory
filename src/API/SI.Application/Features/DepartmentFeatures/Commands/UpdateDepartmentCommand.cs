using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.DepartmentContract;
using SI.Domain.Common.Utils;

namespace SI.Application.Features.DepartmentFeatures.Commands;

public class UpdateDepartmentCommand(string id, UpdateDepartmentArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateDepartmentArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateDepartmentCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateDepartmentCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Domain.Entities.Department> departmentRepos) : ICommandHandler<UpdateDepartmentCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        if (request.Arg.Name != null && request.Arg.Name.Trim() == "")
            return CTBaseResult.UnProcess("Tên phòng ban không được chỉ bao gồm khoảng trắng.");

        var checkDepartment = await departmentRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkDepartment is null)
            return CTBaseResult.NotFound("Phòng ban");
        if (checkDepartment.Name == request.Arg.Name)
            return CTBaseResult.UnProcess("Tên phòng ban không thay đổi.");

        var checkExisted = await departmentRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkExisted != null)
            return CTBaseResult.UnProcess($"Phòng ban đã tồn tại.");

        if (request.Arg.Name != null)
        {
            checkDepartment.Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name) ?? checkDepartment.Code;
        }
        checkDepartment.Name = request.Arg.Name ?? checkDepartment.Name;
        checkDepartment.ModifiedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateDepartmentCommandValidator : AbstractValidator<UpdateDepartmentCommand>
{
    public UpdateDepartmentCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .MaximumLength(1024)
            .WithMessage("Tên phòng ban tối đa 1024 ký tự.");
    }
}