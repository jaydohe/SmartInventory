using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using CTCore.DynamicQuery.Core.Domain;
using CTCore.DynamicQuery.OData.Core;
using CTCore.DynamicQuery.OData.Definations;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace SI.Domain.ValueObjeZLight.Location;

[ODataRouting(nameof(District), 
RouteRefix = "public-api", 
IgnoredActions = [ApiActions.Create, ApiActions.Update, ApiActions.Delete])]
    public class District : CTBaseEntity 
    {
        [Key]
        public override string Id { get; init; } = null!;

        [StringLength(100)]
        public string Name { get; set; } = null!;

        [ForeignKey(nameof(Province))]
        public string ProvinceId { get; set; } = null!;

        [JsonIgnore]
        public bool IsDeleted { get; set; } = false;

        public virtual Province? Province { get; set; }
        public virtual ICollection<Ward>? Wards {get;set;} = null;
    }

public class DistrictConfiguration : IEntityTypeConfiguration<District>
{
    public void Configure(EntityTypeBuilder<District> builder)
    {
        builder.HasIndex(e => e.Name);
    }
}
