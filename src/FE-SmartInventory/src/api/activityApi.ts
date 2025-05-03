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
  }
};
