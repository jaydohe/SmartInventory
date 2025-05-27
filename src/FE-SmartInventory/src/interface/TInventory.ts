export type TInventory = {
  productId: string;
  warehouseId: string;
  quantity: number;
  createdAt: string;
  modifiedOn: string;
  deletedOn: string | null;
  id: string;
};

export type TInventoryUpdate = {
  quantity: number;
};
