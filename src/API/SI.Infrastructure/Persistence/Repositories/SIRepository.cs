using CTCore.DynamicQuery.Core.Domain;
using CTCore.DynamicQuery.Core.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace SI.Infrastructure.Persistence.Repositories;

public class SIRepository<TEntity> : IRepository<TEntity> where TEntity : CTBaseEntity
{
    private readonly SIDbContext _context;
    private readonly DbSet<TEntity> _dbSet;

    public SIRepository(SIDbContext context)
    {
        _context = context ?? throw new ArgumentNullException(nameof(context));
        _dbSet = _context.Set<TEntity>();
    }

    public void Add(params TEntity[] entities)
    {
        _dbSet.AddRange(entities);
    }

    public void Remove(params TEntity[] entities)
    {
        _dbSet.RemoveRange(entities);
    }

    public async Task<TEntity?> GetByIdAsync(string id,CancellationToken cancellationToken = default)
    {
        return await _dbSet.FindAsync(id, cancellationToken);
    }

    public IQueryable<TEntity> BuildQuery => _dbSet.AsQueryable();
}
