export type TWarehouse = {
  id: string;
  code: string;
  warehouseId: string | null;
  managerId: string | null;
  wardId: string | null;
  districtId: string | null;
  provinceId: string | null;
  address: string;
  categoryId: string | null;
  name: string;
  capacity: number;
  slaveWarehouses:string[];
  employees:string[];
};
