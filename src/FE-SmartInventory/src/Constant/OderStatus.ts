export const enum OrderStatus {
    INPROCESS = 0,  // Đang xử lý
    DONE      = 1,  // Đã giao
    CANCELED  = -1, // Đã hủy
  }
  
  /** Tra cứu thuộc tính hiển thị */
  export const genOrderStatus = {
    [OrderStatus.INPROCESS]: { label: 'Đang xử lý', color: 'processing' },
    [OrderStatus.DONE]:      { label: 'Đã giao',    color: 'success'    },
    [OrderStatus.CANCELED]:  { label: 'Đã hủy',     color: 'error'      },
  };