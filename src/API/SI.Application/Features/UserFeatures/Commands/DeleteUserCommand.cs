using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;

namespace SI.Application.Features.UserFeatures.Commands;

public class DeleteUserCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteUserCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<User> userRepos) : ICommandHandler<DeleteUserCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        var checkUser = await userRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkUser is null)
            return CTBaseResult.NotFound("Người dùng");

        checkUser.IsLogin = false;
        checkUser.DeletedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}