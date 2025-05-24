export enum GoodsStatus {
  CREATED = 0, // Tạo mới
  PENDING = 1, // Chờ xác nhận
  SUCCESS = 2, // Đã xác nhận
  CANCELLED = -1, // Đã hủy
}

/** Tra cứu thuộc tính hiển thị */
export const genGoodsStatus = {
  [GoodsStatus.CREATED]: { label: 'Tạo mới', color: 'blue' },
  [GoodsStatus.PENDING]: { label: 'Chờ xác nhận', color: 'warning' },
  [GoodsStatus.SUCCESS]: { label: 'Đã xác nhận', color: 'success' },
  [GoodsStatus.CANCELLED]: { label: 'Đã hủy', color: 'error' },
};
