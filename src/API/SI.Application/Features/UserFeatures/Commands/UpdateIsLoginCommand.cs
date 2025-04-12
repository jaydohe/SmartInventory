using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Contract.UserContract;
using SI.Domain.Entities;

namespace SI.Application.Features.UserFeatures.Commands;

public class UpdateIsLoginCommand(string id, UpdateIsLoginArg arg) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public UpdateIsLoginArg Arg { get; set; } = arg;
}

public class UpdateIsLoginCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<User> userRepos) : ICommandHandler<UpdateIsLoginCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(UpdateIsLoginCommand request, CancellationToken cancellationToken)
    {
        var checkUser = await userRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkUser is null)
            return CTBaseResult.NotFound("User");

        checkUser.IsLogin = request.Arg.IsLogin ?? checkUser.IsLogin;
        checkUser.ModifiedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}