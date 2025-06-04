import { RoleEnumString } from '../Constant/Role';

export type PermissionAction = 'create' | 'read' | 'update' | 'delete';

export interface Permission {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

// Loại bỏ 'Record' type để tránh lỗi và sử dụng Partial
export const PAGE_PERMISSIONS: {
  [pageName: string]: Partial<{
    [K in RoleEnumString | 'WAREHOUSE_STAFF_MANAGER' | 'WAREHOUSE_STAFF_EMPLOYEE']: Permission;
  }>;
} = {
  // Danh mục sản phẩm
  CategoryProductPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: true, update: false, delete: false },
  },

  // Danh mục kho
  CategoryWarehousePage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Đại lý
  AgencyPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: false, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: true, read: true, update: true, delete: true },
  },

  // Nhà cung cấp
  MaterialSupplierPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: false, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Kho bãi
  Warehouse: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Nhập kho
  GoodsReceiptPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Xuất kho
  GoodsIssuePage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Tồn kho
  InventoryPage: {
    [RoleEnumString.ADMIN]: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.DEV]: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: true, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: true, update: true, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: true, update: false, delete: false },
  },

  // Sản phẩm
  ProductPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: true, update: false, delete: false },
  },

  // Đơn hàng
  OrderPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: true, update: true, delete: true },
  },

  // Lệnh sản xuất
  ProductionCommandPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_PRODUCER]: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.SALESMAN]: { create: false, read: true, update: true, delete: false },
  },

  // Định mức nguyên vật liệu (sẽ cần tạo trang này)
  MaterialNormPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Định mức nguyên vật liệu (BOM)
  BomPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: true, read: true, update: true, delete: true },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Nhân sự
  Employee: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: true, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: true, update: true, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: false, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Tài khoản
  User: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: false, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: false, update: false, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: false, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Phòng ban
  DepartmentPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: false, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: false, update: false, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: false, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Chức vụ
  PositionPage: {
    [RoleEnumString.ADMIN]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.DEV]: { create: true, read: true, update: true, delete: true },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: false, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: false, update: false, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: false, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Lịch sử hoạt động
  Activity: {
    [RoleEnumString.ADMIN]: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.DEV]: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: false, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: false,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: false, update: false, delete: false },
  },

  // Dashboard (Tất cả role đều có thể xem)
  Dashboard: {
    [RoleEnumString.ADMIN]: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.DEV]: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: true, update: false, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: true, update: false, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: {
      create: false,
      read: true,
      update: false,
      delete: false,
    },
    [RoleEnumString.SALESMAN]: { create: false, read: true, update: false, delete: false },
  },

  // Hồ sơ cá nhân (Tất cả role đều có thể xem và cập nhật)
  Self: {
    [RoleEnumString.ADMIN]: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.DEV]: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.WAREHOUSE_STAFF]: { create: false, read: true, update: true, delete: false },
    WAREHOUSE_STAFF_MANAGER: { create: false, read: true, update: true, delete: false },
    WAREHOUSE_STAFF_EMPLOYEE: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.WAREHOUSE_PRODUCER]: { create: false, read: true, update: true, delete: false },
    [RoleEnumString.SALESMAN]: { create: false, read: true, update: true, delete: false },
  },
};

// Utility functions để check quyền
export const checkPermission = (
  pageName: string,
  action: PermissionAction,
  userRole: string | null,
  isManager: boolean | null
): boolean => {
  if (!userRole || !PAGE_PERMISSIONS[pageName]) {
    return false;
  }

  // Xác định role key dựa trên role và isManager
  let roleKey: string;
  if (userRole === RoleEnumString.WAREHOUSE_STAFF) {
    roleKey = isManager ? 'WAREHOUSE_STAFF_MANAGER' : 'WAREHOUSE_STAFF_EMPLOYEE';
  } else {
    roleKey = userRole;
  }

  const permissions =
    PAGE_PERMISSIONS[pageName][roleKey as keyof (typeof PAGE_PERMISSIONS)[typeof pageName]];
  return permissions ? (permissions as Permission)[action] : false;
};

// Helper functions cho từng action
export const canCreate = (
  pageName: string,
  userRole: string | null,
  isManager: boolean | null
): boolean => {
  return checkPermission(pageName, 'create', userRole, isManager);
};

export const canRead = (
  pageName: string,
  userRole: string | null,
  isManager: boolean | null
): boolean => {
  return checkPermission(pageName, 'read', userRole, isManager);
};

export const canUpdate = (
  pageName: string,
  userRole: string | null,
  isManager: boolean | null
): boolean => {
  return checkPermission(pageName, 'update', userRole, isManager);
};

export const canDelete = (
  pageName: string,
  userRole: string | null,
  isManager: boolean | null
): boolean => {
  return checkPermission(pageName, 'delete', userRole, isManager);
};

// Hook để sử dụng permissions trong components
export const usePermissions = (pageName: string) => {
  // Assuming you have access to user store here
  // You might need to import authStoreSelectors from your user store
  return {
    canCreate: (userRole: string | null, isManager: boolean | null) =>
      canCreate(pageName, userRole, isManager),
    canRead: (userRole: string | null, isManager: boolean | null) =>
      canRead(pageName, userRole, isManager),
    canUpdate: (userRole: string | null, isManager: boolean | null) =>
      canUpdate(pageName, userRole, isManager),
    canDelete: (userRole: string | null, isManager: boolean | null) =>
      canDelete(pageName, userRole, isManager),
  };
};

// Danh sách pages có thể truy cập theo role
export const getAccessiblePages = (
  userRole: string | null,
  isManager: boolean | null
): string[] => {
  if (!userRole) return [];

  const accessiblePages: string[] = [];

  Object.keys(PAGE_PERMISSIONS).forEach((pageName) => {
    if (canRead(pageName, userRole, isManager)) {
      accessiblePages.push(pageName);
    }
  });

  return accessiblePages;
};
