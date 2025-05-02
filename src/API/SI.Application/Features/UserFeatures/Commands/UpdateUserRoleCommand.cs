using CTCore.DynamicQuery.Common.Definations;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Common.Authenticate;
using SI.Domain.Entities;
using SI.Domain.Enums;

namespace SI.Application.Features.UserFeatures.Commands;

public class UpdateUserRoleCommand(string id, string role) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
    public string UserRoles { get; set; } = role;
}

public class UpdateUserRoleCommandHandler
    (
        IUnitOfWork unitOfWork,
        IRepository<User> userRepos,
        IUserIdentifierProvider identifierProvider
    ) : ICommandHandler<UpdateUserRoleCommand, OkResponse>
{

    public async Task<CTBaseResult<OkResponse>> Handle(UpdateUserRoleCommand request, CancellationToken cancellationToken)
    {
        var role = identifierProvider.Role;
        var loginRole = Enum.Parse<UserRoles>(role);
        var checkUser = await userRepos.BuildQuery.FirstOrDefaultAsync(e => e.Id == request.Id, cancellationToken);
        if (checkUser == null)
            return CTBaseResult.NotFound("User");

        if (!Enum.TryParse<UserRoles>(request.UserRoles, out var userRole) || !Enum.IsDefined(typeof(UserRoles), userRole))
        {
            return CTBaseResult.NotFound("User Role");
        }

        if (loginRole == UserRoles.ADMIN)
        {
            if (checkUser.Role == UserRoles.ADMIN)
                return CTBaseResult.UnProcess("You do not permission to update role this user");

            if (userRole == UserRoles.DEV || userRole == UserRoles.ADMIN)
                return CTBaseResult.UnProcess("You do not permission to update this role");
        }

        if (loginRole == UserRoles.DEV)
        {
            if (userRole == UserRoles.DEV)
                return CTBaseResult.UnProcess("You do not permission to update this role");
        }


        checkUser.Role = userRole;
        checkUser.ModifiedOn = DateTimeOffset.UtcNow;
        checkUser.ActivityUpdateUserRole(identifierProvider.Name, role, identifierProvider.WarehouseId);

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret < 0)
            return CTBaseResult.Failure(new DbUpdateException(), ErrorCodes.Server);
        return CTBaseResult.Success();
    }
}
