import { TPage, TResponse } from '@/interface';
import { TUnit } from '@/interface/TUnit';
import axiosClient from './AxiosClient';

export const unitListApi = {
  getAll: async (params?: string): Promise<TPage<TUnit>> => {
    const url = `/api/v1/zunit?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetail: async (id: string): Promise<TResponse<TUnit>> => {
    const url = `/api/v1/zunit/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  createUnit: async (data: TUnit) => {
    const url = '/api/v1/zunit';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  updateUnit: async (id: string, data: TUnit) => {
    const url = `/api/v1/zunit/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteUnit: async (id: string) => {
    const url = `/api/v1/zunit/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};