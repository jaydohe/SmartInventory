namespace SI.Domain.Enums;

public enum UserRoles
{
    DEV,
    OWNER, // chủ sở hữu
    ADMIN, // quản trị viên
    SUPERVISOR, // giám sát viên
    WAREHOUSE_STAFF, // nhân viên kho
    SALESMAN // nhân viên bán hàng
}


public struct APIPolicies
{
    public const string DEV = "DEV";
    public const string OWNER = "OWNER";
    public const string ADMIN = "ADMIN";
    public const string SUPERFULL = "SUPERFULL";
    public const string WAREHOUSEFULL = "WAREHOUSEFULL";
    public const string SALESFULL = "SALESFULL";
}
