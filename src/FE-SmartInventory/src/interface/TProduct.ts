import { ProductTypes } from "@/Constant/ProductTypes";

export type TProduct = {
  id: string; 
  code: string; // mã sản phẩm
  name: string;
  description: string;
  unit: string;
  productType: ProductTypes;
  purchasePrice: number;
  sellingPrice: number;
  holdingCost: number;
  materialSupplierId?: string; // nullable
  warehouseId: string;
  categoryId: string;
  createdAt: string;
};

export type TCreateProduct = {
  name: string;
  description: string;
  unit: string;
  productType: ProductTypes;
  purchasePrice: number;
  sellingPrice: number;
  holdingCost: number;
  materialSupplierId?: string; // nullable
  warehouseId: string;
  categoryId: string;

};

export type TUpdateProduct = {
  id: string; // cần để biết đang cập nhật sản phẩm nào
  name?: string;
  description?: string;
  unit?: string;
  purchasePrice?: number;
  sellingPrice?: number;
  holdingCost?: number;
  categoryId?: string;
};
