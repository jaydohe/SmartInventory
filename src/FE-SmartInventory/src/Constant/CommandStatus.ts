// contentType:
export const enum CommandStatus {
    CREATED = 0,
    PENDING = 1,
    CONFIRMED = 2,
    INPROGRESS = 3,
    COMPLETED = 4,
    CANCELLED = -1
  }

export const genActivityContentType = {
    [CommandStatus.CREATED]:    { label: 'Đã tạo',             color: 'default'   },
    [CommandStatus.PENDING]:    { label: 'Chờ xác nhận',       color: 'warning'   },
    [CommandStatus.CONFIRMED]:  { label: 'Đã xác nhận',        color: 'processing'},
    [CommandStatus.INPROGRESS]: { label: 'Đang sản xuất',      color: 'cyan'      },
    [CommandStatus.COMPLETED]:  { label: 'Hoàn thành',         color: 'success'   },
    [CommandStatus.CANCELLED]:  { label: 'Đã hủy',             color: 'error'     },
  };


  export const enum ProcessProductionStatus {
    PREPARATION    = 0,  // Chuẩn bị
    PRODUCTION     = 1,  // Sản xuất
    QUALITYCONTROL = 2,  // Kiểm tra chất lượng
    PACKAGING      = 3,  // Đóng gói
    COMPLETED      = 4,  // Hoàn thành
  }
  
  export const genProcessStatus = {
    [ProcessProductionStatus.PREPARATION]:    { label: 'Chuẩn bị',          color: 'default' },
    [ProcessProductionStatus.PRODUCTION]:     { label: 'Sản xuất',          color: 'processing' },
    [ProcessProductionStatus.QUALITYCONTROL]: { label: 'Kiểm tra chất lượng', color: 'purple' },
    [ProcessProductionStatus.PACKAGING]:      { label: 'Đóng gói',          color: 'cyan' },
    [ProcessProductionStatus.COMPLETED]:      { label: 'Hoàn thành',        color: 'success' },
  };