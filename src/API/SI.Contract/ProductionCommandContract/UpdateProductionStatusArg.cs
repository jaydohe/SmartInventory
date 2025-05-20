using SI.Domain.Enums;

namespace SI.Contract.ProductionCommandContract;

public class UpdateProductionStatusArg
{
    public CommandStatus Status { get; set; }
}
