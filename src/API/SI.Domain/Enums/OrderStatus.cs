namespace SI.Domain.Enums;

public enum OrderStatus
{
    // <summary>
    // mới tạo
    // </summary>
    NEW = 0,

    // <summary> 
    // đang xử lý
    // </summary
    INPROCESS = 1,

    // <summary>
    // đã giao hàng
    // </summary>
    DELIVERED = 2,

    // <summary>
    // đã hoàn tiền
    // </summary>
    REFUNDED = 3,

    // <summary>
    // đã hủy
    // </summary>
    CANCELED = -1
}
