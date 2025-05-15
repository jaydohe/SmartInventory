namespace SI.Domain.Enums;

public enum CommandStatus
{
    // <summary>
    // Đã tạo
    // </summary>
    CREATED = 0,

    // <summary>
    // Đang sản xuất
    // </summary>
    INPROGRESS = 1,

    // <summary>
    // Đã hoàn thành
    // </summary>
    COMPLETED = 2,

    // <summary>
    // Đã hủy
    // </summary>
    CANCELLED = -1
}

public enum ProcessProductionStatus
{
    // <summary>
    // Đang chuẩn bị
    // </summary>
    PREPARATION = 0,

    // <summary>
    // Đang sản xuất
    // </summary>
    PRODUCTION = 1,

    // <summary>
    // Kiểm tra chất lượng
    // </summary>
    QUALITYCONTROL = 2,

    // <summary>
    // Đóng gói
    // </summary>
    PACKAGING = 3,

    // <summary>
    // Đã hoàn thành
    // </summary>
    COMPLETED = 4
}
