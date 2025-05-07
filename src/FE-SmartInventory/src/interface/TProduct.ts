// interface TProduct định nghĩa đầy đủ những gì ở backend trả về
export type TProduct = {
  id: string;                // duy nhất, do backend sinh
  code: string;              // mã sản phẩm
  name: string;
  description: string;
  unit: string;
  productType: string;
  purchasePrice: number;
  sellingPrice: number;
  holdingCost: number;
  materialSupplierId?: string; // nullable
  warehouseId: string;
  categoryId: string;
};

export type TCreateProduct = {
  name: string;
  description: string;
  unit: string;
  productType: string;
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
