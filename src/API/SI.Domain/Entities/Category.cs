using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using SI.Domain.Common.Abstractions;
using SI.Domain.Common.Primitives;
using SI.Domain.Enums;

namespace SI.Domain.Entities;

public class Category : AggregateRoot, IAuditableEntity, ISoftDeletableEntity
{
    // <summary>
    // Mã danh mục
    // </summary>
    public string Code { get; set; } = null!;

    // <summary>
    // Tên danh mục
    // </summary>
    public string Name { get; set; } = null!;

    // <summary>
    // Loại danh mục
    // </summary>
    public string CategoryEntityType { get; set; } = string.Empty;

    public DateTimeOffset CreatedAt { get; set; } = DateTimeOffset.UtcNow;
    public DateTimeOffset? ModifiedOn { get; set; }
    public DateTimeOffset? DeletedOn { get; set; }

    public Category(string id) : base(id) { }
    public Category() : base() { }

}

public class CategoryConfiguration() : IEntityTypeConfiguration<Category>
{
    public void Configure(EntityTypeBuilder<Category> builder)
    {
        builder.HasIndex(x => x.Code);

        // Seed data
        var categories = new List<Category>
        {
            new Category("1") 
            { 
                Code = "CATW001", 
                Name = "Danh mục 1",
                CategoryEntityType = CategoryEntityTypes.WAREHOUSE
            },
            new Category("2") 
            { 
                Code = "CATP002", 
                Name = "Danh mục 2",
                CategoryEntityType = CategoryEntityTypes.PRODUCT
            },
            new Category("3") 
            { 
                Code = "CATW003", 
                Name = "Danh mục 3",
                CategoryEntityType = CategoryEntityTypes.WAREHOUSE
            },
            new Category("4")
            {
                Code = "CATW004",
                Name = "Toàn thời gian",
                CategoryEntityType = CategoryEntityTypes.POSITION
            },
            new Category("5")
            {
                Code = "CATW005",
                Name = "Bán thời gian",
                CategoryEntityType = CategoryEntityTypes.POSITION
            },
        };
        builder.HasData(categories);
    }
}