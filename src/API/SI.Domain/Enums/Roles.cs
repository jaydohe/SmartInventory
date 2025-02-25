namespace SI.Domain.Enums;

public enum UserRoles
{
    DEV,
    ADMIN,
    OPERATION, // vận hành
    SUPERVISION, // giám sát
    TECHNICAL, // kĩ thuật
    MAINTENANCE // thợ
}


public struct APIPolicies
{
    public const string DEV = "DEV";
    public const string ADMIN = "ADMIN";
    public const string OPERATEFULL = "OPERATEFULL";
    public const string SUPERVIFULL = "SUPERVIFULL";
    public const string TECHNIFULL = "TECHNIFULL";
    public const string MAINTEFULL = "MAINTEFULL";
    public const string MAINTE_OR_TECHNI = "MAINTE_OR_TECHNI";
    public const string MAINTE_OR_OPERA = "MAINTE_OR_OPERA";

}
