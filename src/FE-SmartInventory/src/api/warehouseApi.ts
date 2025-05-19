import { TPage, TResponse } from '@/interface';
import { TWarehouse, TCreateWarehouse } from '@/interface/TWarehouse';
import axiosClient from './AxiosClient';

export const warehouseApi = {
  getAllWarehouse: async (params: string): Promise<TPage<TWarehouse>> => {
    const url = `/api/v1/warehouse/get-all?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  getWarehouseById: async (id: string, params?: string): Promise<TWarehouse> => {
    const url = params ? `/api/v1/warehouse/get-by-id/${id}?${params}` : `/api/v1/warehouse/get-by-id/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createWarehouse: async (data: TCreateWarehouse) => {
    const url = 'api/v1/warehouse/create';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  updateWarehouse: async (id: string, data: TCreateWarehouse) => {
    const url = `/api/v1/warehouse/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteWarehouse: async (id: string) => {
    const url = `/api/v1/warehouse/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
