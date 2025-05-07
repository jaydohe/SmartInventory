export enum OrderStatus {
    NEW       = 0,  // Tạo mới 
    INPROCESS = 1,  // Đang xử lý
    DELIVERED = 2,  // Đã giao
    REFUNDED  = 3,  // Đã hoàn tiền  
    CANCELED  = -1, // Đã hủy
  }
  
  /** Tra cứu thuộc tính hiển thị */
  export const genOrderStatus = {
    [OrderStatus.NEW]: { label: 'Đang tạo mới',      color: 'processing' },
    [OrderStatus.INPROCESS]: { label: 'Đang xử lý',  color: 'processing' },
    [OrderStatus.DELIVERED]: { label: 'Đã giao',     color: 'success' },
    [OrderStatus.REFUNDED]:  { label: 'Đã hoàn tiền',color: 'success' },
    [OrderStatus.CANCELED]:  { label: 'Đã hủy',      color: 'error'      },
  };