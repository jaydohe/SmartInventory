using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SI.Domain.Entities;

public class Position : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    [ForeignKey(nameof(Category))]
    public string? CategoryId { get; set; }

    // <summary>
    // Tên chức vụ
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public virtual Category? Category { get; set; }

    public Position(string id) : base(id) { }
    public Position() : base() { }
}

public class PositionConfiguration : IEntityTypeConfiguration<Position>
{
    public void Configure(EntityTypeBuilder<Position> builder)
    {
        // Seed data
        var positions = new List<Position>
        {
            new Position("1") 
            {
                CategoryId = "4",
                Name = "Giám đốc" 
            },
            new Position("2") 
            {
                CategoryId = "4",
                Name = "Phó giám đốc" 
            },
            new Position("3") 
            {
                CategoryId = "4",
                Name = "Trưởng phòng" 
            },
            new Position("4") 
            {
                CategoryId = "4",
                Name = "Quản lý kho" 
            },
            new Position("5")
            {
                CategoryId = "4",
                Name = "Nhân viên kho"
            },
            new Position("6")
            {
                CategoryId = "4",
                Name = "Quản lý sản xuất"
            },
            new Position("7")
            {
                CategoryId = "5",
                Name = "Nhân viên bán hàng"
            }
        };
        builder.HasData(positions);
    }
}