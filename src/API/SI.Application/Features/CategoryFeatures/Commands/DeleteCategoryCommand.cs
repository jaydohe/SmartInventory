using CTCore.DynamicQuery.Core.Domain.Interfaces;
using CTCore.DynamicQuery.Core.Mediators.Interfaces;
using CTCore.DynamicQuery.Core.Primitives;
using Microsoft.EntityFrameworkCore;
using SI.Domain.Entities;

namespace SI.Application.Features.CategoryFeatures.Commands;

public class DeleteCategoryCommand(string id) : ICommand<OkResponse>
{
    public string Id { get; set; } = id;
}

public class DeleteCategoryCommandHandler(
    IUnitOfWork unitOfWork,
    IRepository<Category> categoryRepos,
    IRepository<Warehouse> wareRepos,
    IRepository<Product> prodRepos) : ICommandHandler<DeleteCategoryCommand, OkResponse>
{
    public async Task<CTBaseResult<OkResponse>> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
    {
        var checkCat = await categoryRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.Id == request.Id && x.DeletedOn == null, cancellationToken);
        if (checkCat is null)
            return CTBaseResult.NotFound("Category");

        var checkWare = await wareRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.CategoryId == checkCat.Id && x.DeletedOn == null, cancellationToken);
        if (checkWare != null)
            return CTBaseResult.UnProcess("Category is used in Warehouse.");

        var checkProd = await prodRepos.BuildQuery
            .FirstOrDefaultAsync(x => x.CategoryId == checkCat.Id && x.DeletedOn == null, cancellationToken);
        if (checkProd != null)
            return CTBaseResult.UnProcess("Category is used in Product.");

        checkCat.DeletedOn = DateTimeOffset.UtcNow;

        var ret = await unitOfWork.SaveChangeAsync(cancellationToken);
        if (ret <= 0)
            return CTBaseResult.UnProcess(new DbUpdateException("err " + ret.ToString()));

        return CTBaseResult.Success();
    }
}