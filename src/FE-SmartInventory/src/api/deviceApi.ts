import { TPage, TResponse } from '@/interface';
import axiosClient from './AxiosClient';
import { TCities, TDistrict, TWards } from '@/interface/TPublicAddress';
import { create } from 'zustand';
import { TCreateDevice, TDevice, TUpdateDevice } from '@/interface/TDevice';

export const deviceApi = {
  getAllDevice: async (params: string): Promise<TPage<TDevice>> => {
    const url = `/api/v1/device?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createDevice: async (data: TCreateDevice): Promise<TResponse<string>> => {
    const url = `/api/v1/device`;
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  updateDevice: async (data: TUpdateDevice): Promise<TResponse<string>> => {
    const url = `/api/v1/device/${data.deviceCode}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteDevice: async (id: string): Promise<TResponse<string>> => {
    const url = `/api/v1/device/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
