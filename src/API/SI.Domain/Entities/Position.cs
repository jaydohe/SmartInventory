using CTCore.DynamicQuery.OData.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Enums;
using System.ComponentModel.DataAnnotations;

namespace SI.Domain.Entities;

[ODataRouting(nameof(Position), RouteRefix = "api/v1")]
[Authorize(Policy = APIPolicies.ADMIN)]
public class Position : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Tên chức vụ
    // </summary>
    [StringLength(1024)]
    public string Name { get; set; } = null!;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

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
                Name = "Giám đốc" 
            },
            new Position("2") 
            {
                Name = "Phó giám đốc" 
            },
            new Position("3") 
            {
                Name = "Trưởng phòng" 
            },
            new Position("4") 
            {
                Name = "Quản lý kho" 
            },
            new Position("5")
            {
                Name = "Nhân viên kho"
            },
            new Position("6")
            {
                Name = "Quản lý sản xuất"
            },
            new Position("7")
            {
                Name = "Nhân viên bán hàng"
            }
        };
        builder.HasData(positions);
    }
}