export type TWarehouse = {
  id: string;
  code: string;
  warehouseId?: string;
  managerId?: string;
  wardId?: string;
  districtId?: string;
  provinceId?: string;
  address: string;
  categoryId?: string;
  name: string;
  capacity: number;
  slaveWarehouses:string[];
  employees:string[];
};

export type TCreateWarehouse = {
  warehouseId?: string;
  managerId?: string;
  wardId: string;
  districtId: string;
  provinceId: string;
  categoryId?: string;
  name: string;
  address: string;
  capacity: number;
};

export type TUpdateWarehouse = {
  id: string;
  warehouseId?: string;
  managerId?: string;
  wardId?: string;
  districtId?: string;
  provinceId?: string;
  categoryId?: string;
  name?: string;
  address?: string;
  capacity?: number;
};
