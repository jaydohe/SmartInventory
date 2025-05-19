import { TPage, TResponse } from '@/interface';
import { TCategory, TCreateCategory } from '@/interface/TCategory';
import axiosClient from './AxiosClient';

export const categoryApi = {
  getAllCategoryProduct: async (params: string): Promise<TPage<TCategory>> => {
    const url = `/api/v1/category/get-all-product?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getAllCategoryWarehouse: async (params: string): Promise<TPage<TCategory>> => {
    const url = `/api/v1/category/get-all-warehouse?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  getCategoryById: async (id: string, params?: string): Promise<TCategory> => {
    const url = params
      ? `/api/v1/category/get-by-id/${id}?${params}`
      : `/api/v1/category/get-by-id/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createCategoryProduct: async (data: TCreateCategory) => {
    const url = 'api/v1/category/create-product';
    const res = await axiosClient.post(url, data);
    return res.data;
  },

  createCategoryWarehouse: async (data: TCreateCategory) => {
    const url = 'api/v1/category/create-warehouse';
    const res = await axiosClient.post(url, data);
    return res.data;
  },

  updateCategory: async (id: string, data: TCreateCategory) => {
    const url = `/api/v1/category/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteCategory: async (id: string) => {
    const url = `/api/v1/category/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
