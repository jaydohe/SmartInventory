using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Common.Utils;
using SI.Domain.Enums;
using SI.Domain.Events;

namespace SI.Domain.Entities;

public class ZUnit : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    public ZUnit(string id) : base(id) { }
    public ZUnit() : base() { }
    /// <summary>
    /// mã unit EOH
    /// </summary>
    public long? RefId {get;set;}
    public string Name { get; set; } = null!;
    public virtual ICollection<User>? Users {get;set;}
    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public void ActivityCreateZUnit(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.CREATED,
            $@"{userName} ({userRole}) đã tạo mới đơn vị ({this.Name}) vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.ZUNIT,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityUpdateZUnit(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.UPDATED,
            $@"{userName} ({userRole}) đã cập nhật đơn vị ({this.Name}) vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.ZUNIT,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }

    public void ActivityDelZUnit(string userName, string userRole, string? unitId)
    {
        var payLoad = new WriteActiPayLoad
        (
            this.Name,
            ActivityContentTypes.DELETED,
            $@"{userName} ({userRole}) đã xóa đơn vị ({this.Name}) vào lúc {DateTimeOffset.UtcNow.ToLocal():dd/MM/yyyy HH:mm:ss}",
            ActivityEntityTypes.ZUNIT,
            unitId
        );
        this.Raise(new WriteActivityEvent(Activity.Create(payLoad)));
    }
}
public class UnitConfiguration() : IEntityTypeConfiguration<ZUnit>
{
    public void Configure(EntityTypeBuilder<ZUnit> builder)
    {
        var guidFilePath = @"../guids.txt";
        try {
            var guids = File.ReadAllLines(guidFilePath);

            var units = new List<ZUnit>();
            for(int i = 0; i < 50; i++)
            {
                var id = guids[i].ToString();
                var unit = new ZUnit(id)
                {
                    Name = $"Unit {i+1}"
                };
                units.Add(unit);
            }

            builder.HasData(units);
        }catch
        {
            
        } 
        builder.HasIndex(e => e.RefId);
        
    }
}