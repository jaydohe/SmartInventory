import { TPage, TResponse } from '@/interface';
import { TCategory, TCreateCategory } from '@/interface/TCategory';
import axiosClient from './AxiosClient';
import { TBom, TBomCreate, TBomUpdate } from '@/interface/TBom';

export const bomApi = {
  getAllBom: async (params: string): Promise<TPage<TBom>> => {
    const url = `/api/v1/bom/get-all?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  getBomById: async (id: string, params?: string): Promise<TResponse<TBom>> => {
    const url = params ? `/api/v1/bom/get-by-id/${id}?${params}` : `/api/v1/bom/get-by-id/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createBom: async (data: TBomCreate) => {
    const url = 'api/v1/bom/create';
    const res = await axiosClient.post(url, data);
    return res.data;
  },

  updateBom: async (id: string, data: TBomUpdate) => {
    const url = `/api/v1/bom/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteCategory: async (id: string) => {
    const url = `/api/v1/category/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },

  deleteBom: async (id: string) => {
    const url = `/api/v1/bom/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
