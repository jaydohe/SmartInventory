using CTCore.DynamicQuery.Core.Domain.Interfaces;
using MediatR;
using SI.Infrastructure.Persistence;

namespace SI.Application.Core.Behaviors;

public class UnitOfWorkBehavior<TTRequest, TTResponse>(IEnumerable<IUnitOfWork> unitOfWorks)
        : IPipelineBehavior<TTRequest, TTResponse>
        where TTRequest : notnull
        where TTResponse : notnull
{
    public async Task<TTResponse> Handle(TTRequest request,
        RequestHandlerDelegate<TTResponse> next,
        CancellationToken cancellationToken)
    {
        IUnitOfWork siUnitOfWork = unitOfWorks.OfType<UnitOfWork<SIDbContext>>().First();
        if (IsCommand)
            await siUnitOfWork.BeginTransactionAsync(cancellationToken);

        var response = await next();

        if (!IsCommand)
            return response;

        try
        {
            await siUnitOfWork.CommitAsync(cancellationToken);
            return response;
        }
        catch
        {
            await siUnitOfWork.RollbackAsync(cancellationToken);
            throw;
        }
    }

    private static bool IsCommand => typeof(TTRequest).Name.EndsWith("Command");
}