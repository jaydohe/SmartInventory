﻿namespace SI.Contract.EmployeeContract;

public class CreateEmployeeArg
{
    public string PositionId { get; set; } = null!;
    public string DepartmentId { get; set; } = null!;
    public string? WarehouseId { get; set; }
    public string Code { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Gender { get; set; } = null!;
    public bool IsManager { get; set; }
    public string PhoneNumber { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Address { get; set; } = null!;
    public DateTime DateHired { get; set; }
}
