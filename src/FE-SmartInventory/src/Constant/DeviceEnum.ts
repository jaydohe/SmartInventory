export enum DeviceStateEnum {
  NORMAL = 0, // green
  ERROR = -1, // red color
  OFF = 2,
}
export enum DeviceStatusEnum {
  ACTIVE = 1, // green
  DELETE = -1, // red color
  INACTIVE = 0,
}
export const DeviceStateToStr = {
  [DeviceStateEnum.NORMAL]: { name: 'Bình thường', color: 'success' },
  [DeviceStateEnum.ERROR]: { name: 'Bảo trì', color: 'volcano' },
  [DeviceStateEnum.OFF]: { name: 'Tắt', color: 'error' },
};

export const DeviceStatusStr = {
  [DeviceStatusEnum.ACTIVE]: { name: 'Hoạt động', color: 'processing' },
  [DeviceStatusEnum.INACTIVE]: { name: 'Không hoạt động', color: 'magenta' },
  [DeviceStatusEnum.DELETE]: { name: 'Xoá', color: 'error' },
};
