namespace SI.Contract.SmartContract;

public class DemandForecastResponse
{
    public string ProductId { get; set; } = null!;
    public string ProductName { get; set; } = null!;
    public string ProductUnit { get; set; } = null!;
    public string WarehouseId { get; set; } = null!;
    public string WarehouseName { get; set; } = null!;
    public DateTimeOffset CreatedAt { get; set; }

    // Dữ liệu dự báo 3 tháng
    public List<ForecastData> ForecastData { get; set; } = new();
}

public class ForecastData
{
    public string Period { get; set; } = null!; // "2024-01", "2024-02"
    public double? ForecastValue { get; set; }
    public string Method { get; set; } = null!;
    public double? Trend { get; set; }
    public double? Seasonal { get; set; }
    public int SeasonalityPeriod { get; set; }
    public double LowerBound { get; set; }
    public double UpperBound { get; set; }
}

public class InventoryOptimizationResponse
{
    public string ProductId { get; set; } = null!;
    public string ProductName { get; set; } = null!;
    public string ProductUnit { get; set; } = null!;
    public string WarehouseId { get; set; } = null!;
    public string WarehouseName { get; set; } = null!;
    public string Method { get; set; } = null!;
    public double EOQ { get; set; }
    public double SafetyStock { get; set; }
    public double OptimalInventory { get; set; }
    public DateTimeOffset CreatedAt { get; set; }
}
