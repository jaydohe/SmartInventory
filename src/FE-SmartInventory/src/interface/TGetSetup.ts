export type TGetSetup = {
  zScore: number; // zScore: null / >= 0 / mức dịch vụ mong muốn (dùng phần trăm)
  minStockLevel: number; // >= 0 / mức tồn kho thấp nhất
  createdAt: string;
  modifiedOn: string | null;
};

export type TCreateSetup = {
  zScore: number;
  minStockLevel: number;
};
