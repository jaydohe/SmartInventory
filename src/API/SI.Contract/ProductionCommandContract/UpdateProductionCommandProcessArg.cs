using SI.Domain.Enums;

namespace SI.Contract.ProductionCommandContract;

public class UpdateProductionCommandProcessArg
{
    public double? Percentage { get; set; }
    public string? Note { get; set; }
    public ProcessProductionStatus? Status { get; set; }
    public DateTimeOffset? ActualStart { get; set; }
    public DateTimeOffset? ActualEnd { get; set; }
}
