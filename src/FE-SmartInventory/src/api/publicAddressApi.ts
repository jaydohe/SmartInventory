import { TPage, TResponse } from '@/interface';
import axiosClient from './AxiosClient';
import { TCities, TDistrict, TWards } from '@/interface/TPublicAddress';

export const publicAddressApi = {
  getAllCities: async (params: string): Promise<TPage<TCities>> => {
    let url = `/public-api/province`;
    if (params) {
      url = `/public-api/province?${params}`;
    }
    const res = await axiosClient.get(url);
    return res.data;
  },
  getAllDistricts: async (params: string): Promise<TPage<TDistrict>> => {
    let url = `/public-api/district`;
    if (params) {
      url = `/public-api/district?${params}`;
    }
    const res = await axiosClient.get(url);
    return res.data;
  },
  getAllWards: async (params: string): Promise<TPage<TWards>> => {
    let url = `/public-api/ward`;
    if (params) {
      url = `/public-api/ward?${params}`;
    }
    const res = await axiosClient.get(url);
    return res.data;
  },
};
