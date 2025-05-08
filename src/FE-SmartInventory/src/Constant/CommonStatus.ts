export enum CommonStatus {
    INACTIVE = 0,  // Khóa tài khoản
    ACTIVE   = 1,  // Đang hoạt động
    DELETED  = -1, // Đã xóa
  }
  
  /** Tra cứu thuộc tính hiển thị */
  export const genCommonStatus = {
    [CommonStatus.INACTIVE]: { label: 'Khóa',        color: 'warning'   },
    [CommonStatus.ACTIVE]:   { label: 'Hoạt động',   color: 'success'   },
    [CommonStatus.DELETED]:  { label: 'Đã xóa',      color: 'error'     },
  };
  