import { TPage, TResponse } from '@/interface';
import { TDepartment, TCreateDepartment } from '@/interface/TDepartment';
import axiosClient from './AxiosClient';

export const departmentApi = {
  getAllDepartment: async (params: string): Promise<TPage<TDepartment>> => {
    const url = `/api/v1/department/get-all?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createDepartment: async (data: TCreateDepartment) => {
    const url = 'api/v1/department/create';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  updateDepartment: async (id: string, data: TCreateDepartment) => {
    const url = `/api/v1/department/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteDepartment: async (id: string) => {
    const url = `/api/v1/department/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
