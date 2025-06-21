import { TProduct } from './TProduct';
import { TWarehouse } from './TWarehouse';

export type TInventory = {
  productId: string;
  warehouseId: string;
  quantity: number;
  createdAt: string;
  modifiedOn: string;
  deletedOn: string | null;
  id: string;
  product: TProduct;
  warehouse: TWarehouse;
};

export type TInventoryUpdate = {
  quantity: number;
};

export type TInventoryByProduct = {
  id: string;
  productId: string;
  productName: string;
  productUnit: string;
  warehouseId: string;
  warehouseName: string;
  quantity: number;
  createdAt: string;
};
