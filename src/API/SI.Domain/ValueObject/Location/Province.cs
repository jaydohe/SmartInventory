using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using CTCore.DynamicQuery.Core.Domain;
using CTCore.DynamicQuery.OData.Core;
using CTCore.DynamicQuery.OData.Definations;

namespace SI.Domain.ValueObjeSI.Location;

[ODataRouting(nameof(Province), 
    RouteRefix = "public-api", 
    IgnoredActions = [ApiActions.Create, ApiActions.Update, ApiActions.Delete])]
public class Province : CTBaseEntity 
{
    [Key]
    public override string Id { get; init; } = null!;

    [StringLength(100)]
    public required string Name { get; set; }
    [JsonIgnore]
    public bool IsDeleted { get; set; }

    public virtual ICollection<District>? Districts {get;set;} = null;
}

public class ProvinceConfiguration : IEntityTypeConfiguration<Province>
{
    public void Configure(EntityTypeBuilder<Province> builder)
    {
        builder.HasIndex(e => e.Name);
    }
}
