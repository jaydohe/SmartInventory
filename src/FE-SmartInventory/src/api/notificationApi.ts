import { TNotification, TPage, TResponse } from '@/interface';
import axiosClient from './AxiosClient';

export const notificationApi = {
  getAll: async (params: string): Promise<TPage<TNotification>> => {
    const url = `private-api/Notification?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getUnReadCount: async (params: string): Promise<TResponse<number>> => {
    const url = `/private-api/Notification/count?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  markAsRead: async (data: string[]) => {
    const url = `/private-api/Notification`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
};
