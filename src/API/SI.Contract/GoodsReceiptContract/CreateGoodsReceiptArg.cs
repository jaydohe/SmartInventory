namespace SI.Contract.GoodsReceiptContract;

public class CreateGoodsReceiptProductionArg
{
    public string? ProductionCommandId { get; set; }
    public string ShipperName { get; set; } = null!;
    public string? Note { get; set; }
    public List<GoodsReceiptDetailProductionArg> Details { get; set; } = null!;
}

public class GoodsReceiptDetailProductionArg
{
    public int QuantityReceived { get; set; }
}

public class CreateGoodsReceiptOrderArg
{
    public string OrderId { get; set; } = null!;
    public string ShipperName { get; set; } = null!;
    public string? Note { get; set; }
    public List<GoodsReceiptDetailOrderArg> Details { get; set; } = null!;
}

public class GoodsReceiptDetailOrderArg
{
    public int QuantityReceived { get; set; }
}

public class CreateGoodsReceiptMaterialArg
{
    public string MaterialSupplierId { get; set; } = null!;
    public string ShipperName { get; set; } = null!;
    public string? Note { get; set; }
    public List<GoodsReceiptDetailMaterialArg> Details { get; set; } = null!;
}

public class GoodsReceiptDetailMaterialArg
{
    public string ProductId { get; set; } = null!;
    public int QuantityOrdered { get; set; }
    public int QuantityReceived { get; set; }
}
