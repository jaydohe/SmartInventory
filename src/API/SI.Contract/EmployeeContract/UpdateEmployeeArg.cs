﻿namespace SI.Contract.EmployeeContract;

public class UpdateEmployeeArg
{
    public string? DepartmentId { get; set; }
    public string? WarehouseId { get; set; }
    public string? PositionId { get; set; }
    public string? Name { get; set; }
    public string? Gender { get; set; }
    public bool? IsManager { get; set; }
    public string? PhoneNumber { get; set; }
    public string? Email { get; set; }
    public string? Address { get; set; }
}
