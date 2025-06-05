import { TPage, TResponse } from '@/interface';
import { TDepartment, TCreateDepartment } from '@/interface/TDepartment';
import axiosClient from './AxiosClient';
import { TCreateSetup, TGetSetup } from '@/interface/TGetSetup';

export const getSetupApi = {
  getSetup: async (params: string): Promise<TGetSetup> => {
    const url = `/api/v1/setup/get-setup?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createSetup: async (data: TCreateSetup) => {
    const url = 'api/v1/setup';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
};
