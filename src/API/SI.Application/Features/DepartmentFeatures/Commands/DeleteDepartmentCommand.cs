using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;

namespace SI.Application.Features.DepartmentFeatures.Commands;

public class DeleteDepartmentCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteDepartmentCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Department> departmentRepos) : ICommandHandler<DeleteDepartmentCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteDepartmentCommand request, CancellationToken cancellationToken)
    {
        var checkCat = await departmentRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkCat is null)
            return CTBaseResult.NotFound("Department");

        checkCat.DeletedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}
