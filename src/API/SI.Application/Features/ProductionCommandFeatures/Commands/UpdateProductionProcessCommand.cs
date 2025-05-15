using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.EntityFrameworkCore;
using SI.Contract.ProductionCommandContract;
using SI.Domain.Entities.ProductionCommands;
using SI.Domain.Enums;

namespace SI.Application.Features.ProductionCommandFeatures.Commands;

public class UpdateProductionProcessCommand(string id, UpdateProductionCommandProcessArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateProductionCommandProcessArg Arg { get; set; } = arg;
    public async Task<ValidationResult> ValidateAsync(CancellationToken cancellationToken = default)
    {
        UpdateProductionProcessCommandValidator validationRules = new();
        return await validationRules.ValidateAsync(this, cancellationToken);
    }
}

public class UpdateProductionProcessCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<ProductionCommandProcess> productionCommandProcessRepos,
    IRepository<ProductionCommand> productionCommandRepos) : ICommandHandler<UpdateProductionProcessCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateProductionProcessCommand request, CancellationToken cancellationToken)
    {
        var checkValid = await request.ValidateAsync(cancellationToken);
        if (!checkValid.IsValid)
            return CTBaseResult.BadRequest(checkValid.Errors);

        var checkProductionCommandProcess = await productionCommandProcessRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.ProductionCommandId == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkProductionCommandProcess is null)
            return CTBaseResult.NotFound("Production Command");

        if (checkProductionCommandProcess.ActualStart != null && request.Arg.ActualStart != null)
            return CTBaseResult.UnProcess("Actual start has been set and cannot be updated.");

        if (request.Arg.Percentage > 100 || request.Arg.Percentage < 0)
            return CTBaseResult.UnProcess("Percentage must be between 0 and 100");

        if (request.Arg.Status == ProcessProductionStatus.COMPLETED && request.Arg.Percentage <= 99.99 ||
            request.Arg.Percentage == 100 && request.Arg.Status != ProcessProductionStatus.COMPLETED)
            return CTBaseResult.UnProcess("Status and Percentage must be completed and 100%");

        checkProductionCommandProcess.ProductionCommands.Status = CommandStatus.INPROGRESS;
        checkProductionCommandProcess.Percentage = request.Arg.Percentage ?? checkProductionCommandProcess.Percentage;
        checkProductionCommandProcess.Note = request.Arg.Note ?? checkProductionCommandProcess.Note;
        checkProductionCommandProcess.Status = request.Arg.Status ?? checkProductionCommandProcess.Status;
        checkProductionCommandProcess.ActualStart = request.Arg.ActualStart;
        checkProductionCommandProcess.ActualEnd = request.Arg.ActualEnd ?? checkProductionCommandProcess.ActualEnd;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}

public class UpdateProductionProcessCommandValidator : AbstractValidator<UpdateProductionProcessCommand>
{
    public UpdateProductionProcessCommandValidator()
    {
        RuleFor(x => x.Arg.Note)
            .MaximumLength(1024)
            .WithMessage("Note is too long. Only up to 1024 characters.");
    }
}