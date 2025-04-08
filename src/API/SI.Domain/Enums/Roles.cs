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
    public const string DEV = "DEV";
    public const string ADMIN = "ADMIN";
    public const string STAFFFULL = "STAFFFULL";
    public const string PRODUCERFULL = "PRODUCERFULL";
    public const string SALESFULL = "SALESFULL";
}
