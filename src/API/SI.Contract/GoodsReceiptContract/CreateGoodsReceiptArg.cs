namespace SI.Contract.GoodsReceiptContract;

public class CreateGoodsReceiptProductionArg
{
    public string? ProductionCommandId { get; set; }
    public string ShipperName { get; set; } = null!;
    public string? Note { get; set; }
    public List<GoodsReceiptDetailArg> Details { get; set; } = null!;
}

public class CreateGoodsReceiptOrderArg
{
    public string OrderId { get; set; } = null!;
    public string ShipperName { get; set; } = null!;
    public string? Note { get; set; }
    public List<GoodsReceiptDetailArg> Details { get; set; } = null!;
}

public class CreateGoodsReceiptMaterialArg
{
    public string MaterialSupplierId { get; set; } = null!;
    public string ShipperName { get; set; } = null!;
    public string? Note { get; set; }
    public List<GoodsReceiptDetailArg> Details { get; set; } = null!;
}

public class GoodsReceiptDetailArg
{
    public string ProductId { get; set; } = null!;
    public int QuantityOrdered { get; set; }
    public int QuantityReceived { get; set; }
}
