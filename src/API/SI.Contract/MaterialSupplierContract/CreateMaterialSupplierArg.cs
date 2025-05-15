namespace SI.Contract.MaterialSupplierContract;

public class CreateMaterialSupplierArg
{
    public string Name { get; set; } = null!;
    public string Representative { get; set; } = null!;
    public string? TaxCode { get; set; }
    public string PhoneNumber { get; set; } = null!;
    public string BusinessItem { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Address { get; set; } = null!;
    public decimal? CurrentDebt { get; set; }
    public string? Note { get; set; }
}
