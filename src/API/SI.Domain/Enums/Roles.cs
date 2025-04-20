namespace SI.Domain.Enums;

public enum UserRoles
{
    DEV,
    ADMIN, // quản trị viên
    WAREHOUSE_STAFF, // nhân viên kho
    WAREHOUSE_PRODUCER, // nhân viên sản xuất
    SALESMAN // nhân viên bán hàng
}


public struct APIPolicies
{
    public const string DEV = "DEV"; //just DEV
    public const string ADMIN = "ADMIN"; // DEV and ADMIN
    public const string STAFFFULL = "STAFFFULL"; // DEV, ADMIN and WAREHOUSE_STAFF
    public const string PRODUCERFULL = "PRODUCERFULL"; // DEV, ADMIN and WAREHOUSE_PRODUCER
    public const string SALESFULL = "SALESFULL"; // DEV, ADMIN and SALESMAN
    public const string FULL = "FULL"; // DEV, ADMIN and WAREHOUSE_STAFF, WAREHOUSE_PRODUCER, SALESMAN
    public const string STAFF_SALESMAN = "STAFF_SALESMAN"; // DEV, ADMIN and WAREHOUSE_STAFF, SALESMAN
}