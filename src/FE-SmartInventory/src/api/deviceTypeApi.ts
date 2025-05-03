import { TPage, TResponse } from '@/interface';
import axiosClient from './AxiosClient';
import { TCities, TDistrict, TWards } from '@/interface/TPublicAddress';
import { create } from 'zustand';
import { TCreateDevice, TDevice } from '@/interface/TDevice';
import { TCreateDeviceType, TDeviceType } from '@/interface/TDeviceType';

export const deviceTypeApi = {
  getAllDeviceType: async (params?: string): Promise<TPage<TDeviceType>> => {
    let url = `/private-api/device-type`;
    if (params) {
      url = `/private-api/device-type?${params}`;
    }
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetailDeviceType: async (id: string): Promise<TResponse<TDeviceType>> => {
    const url = `/private-api/device-type/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  createDeviceType: async (data: TCreateDeviceType): Promise<TResponse<string>> => {
    const url = `/private-api/device-type`;
    const res = await axiosClient.post(url, data);
    return res.data;
  },

  updateDeviceType: async (id: string, data: TCreateDeviceType): Promise<TResponse<string>> => {
    const url = `/private-api/device-type/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteDeviceType: async (id: string) => {
    const url = `/private-api/device-type/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
