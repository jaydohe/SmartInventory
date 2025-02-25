using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using CTCore.DynamicQuery.Core.Domain;
using CTCore.DynamicQuery.OData.Core;
using CTCore.DynamicQuery.OData.Definations;

namespace SI.Domain.ValueObjeZLight.Location
{
[ODataRouting(nameof(Ward), 
RouteRefix = "public-api", 
IgnoredActions = [ApiActions.Create, ApiActions.Update, ApiActions.Delete])]
    public class Ward : CTBaseEntity
    {
        [Key]
        public override string Id { get; init; } = null!;

        [StringLength(100)]
        public  string Name { get; set; } = null!;
        [ForeignKey(nameof(District))]
        public string DistrictId { get; set; } = null!;
        [JsonIgnore]
        public bool IsDeleted { get; set; } = false;

        public virtual District? District { get; set; }
    }

    public class WardConfiguration : IEntityTypeConfiguration<Ward>
    {
        public void Configure(EntityTypeBuilder<Ward> builder)
        {
            builder.HasIndex(e => e.Name);
        }
    }

}
