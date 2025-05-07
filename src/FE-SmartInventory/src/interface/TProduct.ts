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

// tạo mới => bạn sẽ không có id
export type TCreateProduct = Omit<TProduct, 'id'>;

// cập nhật => giống create, nhưng có thêm id
export type TUpdateProduct = TCreateProduct & { id: string };
