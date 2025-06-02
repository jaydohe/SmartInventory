import { TPage, TResponse } from '@/interface';
import { TCreateOrder, TOrder, TUpdateOrderStatus } from '@/interface/TOder';
import axiosClient from './AxiosClient';

export const orderApi = {
  getAll: async (params: string): Promise<TPage<TOrder>> => {
    const url = `/api/v1/order/get-all?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetail: async (id: string): Promise<TResponse<TOrder>> => {
    const url = `/api/v1/order/get-by-id/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  createOrder: async (data: TCreateOrder) => {
    const url = '/api/v1/order/create';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  updateOrderStatus: async (id: string, data: TUpdateOrderStatus) => {
    const url = `/api/v1/order/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteOrder: async (id: string) => {
    const url = `/api/v1/order/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
