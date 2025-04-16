using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.DepartmentContract;
using SI.Domain.Common.Utils;
using SI.Domain.Entities;

namespace SI.Application.Features.DepartmentFeatures.Commands;

public class CreateDepartmentCommand(CreateDepartmentArg arg) : ICommand<OkResponse>
{
    public CreateDepartmentArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        CreateDepartmentCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class CreateDepartmentCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Department> departmentRepos) : ICommandHandler<CreateDepartmentCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(CreateDepartmentCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkDepartment = await departmentRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Name == request.Arg.Name && x.DeletedOn == null, cancellationToken);
        if (checkDepartment != null)
            return CTBaseResult.UnProcess($"Department is existed.");

        var newDepartment = new Department
        {
            Code = CodeGenerationUtils.GenerateCodeFromName(request.Arg.Name),
            Name = request.Arg.Name,
        };

        departmentRepos.Add(newDepartment);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class CreateDepartmentCommandValidator : AbstractValidator<CreateDepartmentCommand>
{
    public CreateDepartmentCommandValidator()
    {
        RuleFor(x => x.Arg.Name)
            .NotEmpty()
            .WithMessage("Name is required.")
            .MaximumLength(1024)
            .WithMessage("Name is too long. Only up to 1024 characters.");
    }
}