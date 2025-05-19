using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;

namespace SI.Application.Features.EmployeeFeatures.Commands;

public class DeleteEmployeeCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteEmployeeCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Employee> employeeRepos,
    IRepository<User> userRepos) : ICommandHandler<DeleteEmployeeCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteEmployeeCommand request, CancellationToken cancellationToken)
    {
        var checkEmp = await employeeRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkEmp is null)
            return CTBaseResult.NotFound("Employee");

        var checkUser = await userRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.EmployeeId == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkUser != null)
            return CTBaseResult.UnProcess("Employee had account.");

        checkEmp.DeletedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}