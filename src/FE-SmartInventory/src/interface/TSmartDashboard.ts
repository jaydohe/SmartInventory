// TAllDemand: Xem danh sách dự báo nhu cầu (DEV, Admin, Warehouse_Staff(quản lý) có thể truy cập )

export type TDemandByPeriod = {
  productId: string; // id của hàng hóa,
  productName: string; // tên của hàng hóa,
  productUnit: string; // đơn vị của hàng hóa,
  warehouseId: string; // id của kho,
  warehouseName: string; // tên của kho,
  fromPeriod: string; // ngày bắt đầu của kỳ dự báo,
  toPeriod: string; // ngày kết thúc của kỳ dự báo,
  forecastValue: number; // giá trị dự báo của kỳ dự báo,
  method: string; // tên phương pháp đã sử dụng,
  trend: number; // xu hướng (mức tăng trung bình hàng kỳ (tháng) của nhu cầu),
  seasonal: number; // tính mùa vụ (-3.15 — điều chỉnh lên/xuống tùy theo mùa, ở đây là giảm nhẹ do mùa vụ),
  seasonalityPeriod: number; // chu kỳ mùa vụ (dữ liệu có tính lặp lại hàng năm (12 tháng 1 chu kỳ)),
  lowerBound: number; // Ngưỡng dưới của dự báo,
  upperBound: number; // Ngưỡng trên ước tính của dự báo (dùng cho đánh giá rủi ro và kế hoạch tồn kho),
  createdAt: string; // ngày khởi tạo
};

//Xem danh sách tối ưu tồn kho (DEV, Admin, Warehouse_Staff(quản lý) có thể truy cập)
export type TInventoryOptimize = {
  productId: string; // id của hàng hóa,
  productName: string; // tên của hàng hóa,
  productUnit: string; // đơn vị của hàng hóa,
  warehouseId: string; // id của kho,
  warehouseName: string; // tên của kho,
  method: string; // tên phương pháp đã sử dụng,
  eoq: number; // số lượng đặt hàng tối ưu,
  safetyStock: number; // số lượng tồn kho an toàn,
  optimalInventory: number; // số lượng tồn kho tối ưu,
  createdAt: string; // ngày khởi tạo
};

//Xem danh sách tồn kho theo kho (DEV, Admin, Warehouse_Staff(quản lý) có thể truy cập)
// api/v1/smart/get-optimize-by-ware/{warehouseid}
// dùng chung type TInventoryOptimize
