import { TPage, TResponse } from '@/interface';
import { TActivity } from '@/interface/TActivity';
import axiosClient from './AxiosClient';

export const activityApi = {
  getAll: async (params?: string): Promise<TPage<TActivity>> => {
    let url = `/private-api/Activity`;
    if (params) {
      url = `/private-api/Activity?${params}`;
    }
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetail: async (id: string): Promise<TResponse<TActivity>> => {
    const url = `/private-api/Activity/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};
