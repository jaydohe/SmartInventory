import { TPage, TResponse } from '@/interface';
import { TScheme } from '@/interface/TScheme';
import axiosClient from './AxiosClient';

export const schemeListApi = {
  getAll: async (params?: string): Promise<TPage<TScheme>> => {
    const url = `/api/v1/scheme?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetail: async (id: string, params?: string): Promise<TResponse<TScheme>> => {
    let url = `/api/v1/scheme/${id}`;
    if (params) {
      url = `/api/v1/scheme/${id}?${params}`;
    }
    const res = await axiosClient.get(url);
    return res.data;
  },
  createScheme: async (data: TScheme) => {
    const url = '/api/v1/scheme';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  deleteScheme: async (id: string) => {
    const url = `/api/v1/scheme/del/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },

  updateScheme: async (id: string, data: TScheme) => {
    const url = `/api/v1/scheme/${id}`;
    const res = await axiosClient.put(url, data);
    return res.data;
  },
  updateProcess: async (id: string, percent: number) => {
    const url = `/api/v1/scheme/${id}/update-process`;
    const res = await axiosClient.patch(url, { percent });
    return res.data;
  },
  assignUser: async (id: string, userIds: string[]) => {
    const url = `/api/v1/scheme/${id}/assign-user`;
    const res = await axiosClient.patch(url, userIds);
    return res.data;
  },
  unassignUser: async (id: string, userIds: string[]) => {
    const url = `/api/v1/scheme/${id}/unassign-user`;
    const res = await axiosClient.patch(url, userIds);
    return res.data;
  },
};
