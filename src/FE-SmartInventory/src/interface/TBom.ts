import { TProduct } from './TProduct';

export type TBom = {
  productId: string; // id hàng hoá
  code: string; // mã số của định mức
  createdAt: string;
  modifiedOn: string;
  deletedOn: null;
  id: string;
  product: TProduct;
  billOfMaterialDetails: TBomDetail[];
};

export type TBomDetail = {
  billOfMaterialId: string;
  materialId: string;
  quantity: number;
  unit: string;
  createdAt: string;
  modifiedOn: string | null;
  deletedOn: string | null;
  id: string;
  material: {
    materialSupplierId: string;
    categoryId: string;
    code: string;
    name: string;
    description: string;
    unit: string;
    productType: string;
    purchasePrice: number;
    sellingPrice: number;
    holdingCost: number;
    createdAt: string;
    modifiedOn: string | null;
    deletedOn: string | null;
    id: string;
  };
};

export type TBomCreate = {
  productId: string;
  bomDetails: Pick<TBomDetail, 'materialId' | 'quantity'>[];
};

export type TBomUpdate = {
  bomDetails: Pick<TBomDetail, 'materialId' | 'quantity'>[];
};
