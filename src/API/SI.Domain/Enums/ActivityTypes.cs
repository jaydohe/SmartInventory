namespace SI.Domain.Enums;

public readonly struct ActivityEntityTypes
{
    public const string AGENCY = "AGENCY";
    public const string USER = "USER";
}

public enum ActivityContentTypes
{
    CREATED = 0,
    UPDATED = 1,
    DELETED = -1
}