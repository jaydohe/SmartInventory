namespace SI.Domain.Enums;

public enum OrderStatus
{
    // <summary>
    // đang xử lý
    // </summary
    INPROCESS = 0,

    // <summary>
    // đã giao
    // </summary>
    DONE = 1,

    // <summary>
    // đã hủy
    // </summary>
    CANCELED = -1
}
