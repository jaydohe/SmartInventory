import { ProductTypes } from '@/Constant/ProductTypes';

export type TProduct = {
  materialSupplierId: any;
  categoryId: string;
  code: string;
  name: string; // tên của mặt hàng hoặc NVL
  description: string;
  unit: string; // đơn vị tính
  productType: ProductTypes; // loại của hàng hóa (enum)
  purchasePrice: number; // giá mua
  sellingPrice: number; // giá bán
  holdingCost: number; // chi phí lưu kho
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
  id: string;
};

export type TCreateProduct = {
  name: string;
  description: string;
  unit: string;
  productType: ProductTypes;
  purchasePrice: number;
  sellingPrice: number;
  holdingCost: number;
  materialSupplierId?: string; // nếu có thì sẽ được hiểu đây là nguyên vật liệu và ngược lại là mặt hàng
  warehouseId: string;
  categoryId: string;
};

export type TUpdateProduct = Omit<TCreateProduct, 'warehouseId' | 'productType'>;
