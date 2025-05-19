export type TWarehouse = {
  id: string;
  code: string;
  warehouseId?: string; // id kho cha
  managerId?: string; // id nhân viên quản lý
  categoryId?: string; // id danh mục
  address: string; // địa chỉ kho
  name: string; // tên kho
  capacity: number; // dung tích kho
  createdAt: string; // ngày tạo
  modifiedOn: any; // ngày sửa
  deletedOn: any; // ngày xóa
};

export type TCreateWarehouse = {
  managerId: string; // id nhân viên quản lý
  categoryId?: string;
  name: string;
  address: string;
  capacity: number;
  warehouseId?: string; // id kho cha
};

export type TUpdateWarehouse = {
  warehouseId?: string; // id kho cha
  managerId?: string;
  categoryId?: string;
  name?: string;
  address?: string;
  capacity?: number;
};
