namespace SI.Domain.Enums;

public enum GoodsStatus
{
    CREATED = 0,

    // <summary>
    // Đang chờ xác nhận
    // </summary>
    PENDING = 1,

    // <summary>
    // Đã xác nhận
    // </summary>
    SUCCESS = 2,

    // <summary>
    // Đã hủy
    // </summary>
    CANCELLED = -1
}
