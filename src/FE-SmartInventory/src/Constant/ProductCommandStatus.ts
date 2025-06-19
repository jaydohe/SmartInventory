export enum ProductCommandProcessStatus {
  PREPARATION = 0, // Đang chuẩn bị
  PRODUCTION = 1, // Đang sản xuất
  QUALITYCONTROL = 2, // Kiểm tra chất lượng
  PACKAGING = 3, // Đóng gói
  COMPLETED = 4, // Đã hoàn thành
}

export const genProductCommandProcessStatus = {
  [ProductCommandProcessStatus.PREPARATION]: {
    label: 'Đang chuẩn bị nguyên vật liệu',
    color: 'volcano',
    value: ProductCommandProcessStatus.PREPARATION,
  },
  [ProductCommandProcessStatus.PRODUCTION]: {
    label: 'Đang sản xuất',
    color: 'processing',
    value: ProductCommandProcessStatus.PRODUCTION,
  },
  [ProductCommandProcessStatus.QUALITYCONTROL]: {
    label: 'Kiểm tra chất lượng hàng hóa',
    color: 'gold',
    value: ProductCommandProcessStatus.QUALITYCONTROL,
  },
  [ProductCommandProcessStatus.PACKAGING]: {
    label: 'Đóng gói hàng hóa',
    color: 'cyan',
    value: ProductCommandProcessStatus.PACKAGING,
  },
  [ProductCommandProcessStatus.COMPLETED]: {
    label: 'Đã hoàn thành',
    color: 'success',
    value: ProductCommandProcessStatus.COMPLETED,
  },
};

export enum ProductCommandStatus {
  CREATED = 0, // Đã tạo
  INPROGRESS = 1, // Đang sản xuất
  COMPLETED = 2, // Đã hoàn thành
  CANCELLED = -1, // Đã hủy
}
export const genProductCommandStatus = {
  [ProductCommandStatus.CREATED]: {
    label: 'Đã tạo',
    color: 'cyan',
    value: ProductCommandStatus.CREATED,
  },
  [ProductCommandStatus.INPROGRESS]: {
    label: 'Đang sản xuất',
    color: 'processing',
    value: ProductCommandStatus.INPROGRESS,
  },
  [ProductCommandStatus.COMPLETED]: {
    label: 'Đã hoàn thành',
    color: 'success',
    value: ProductCommandStatus.COMPLETED,
  },
  [ProductCommandStatus.CANCELLED]: {
    label: 'Đã hủy',
    color: 'error',
    value: ProductCommandStatus.CANCELLED,
  },
};
