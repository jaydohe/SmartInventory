import { TPage, TResponse } from '@/interface';
import axiosClient from './AxiosClient';
import { TCreateProduct, TProduct, TUpdateProduct } from '@/interface/TProduct';
import { TInventory, TInventoryByProduct, TInventoryUpdate } from '@/interface/TInventory';

export const inventoryApi = {
  getAllInventory: async (params: string): Promise<TPage<TInventory>> => {
    const url = `/api/v1/inventory/get-all?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  updateInventory: async (id: string, data: TInventoryUpdate) => {
    const url = `/api/v1/inventory/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },

  getInventoryByProduct: async (id: string): Promise<TInventoryByProduct[]> => {
    const url = `/api/v1/inventory/get-by-product/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};
