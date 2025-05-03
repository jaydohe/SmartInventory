import { TPage, TResponse } from '@/interface';
import { TAccount, TCreateAccount, TUpdateAccount, TUpdatePassword } from '@/interface/TAccount';

import axiosClient from './AxiosClient';

import { RoleEnum } from '@/Constant';

export const accountListApi = {
  getAll: async (params: string): Promise<TPage<TAccount>> => {
    const url = `/account?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  getDetail: async (id: string): Promise<TResponse<TAccount>> => {
    const url = `/account/detail?id=${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createAccount: async (data: TCreateAccount) => {
    const url = '/account';
    const res = await axiosClient.post(url, data);
    return res.data;
  },

  updateAccount: async (id: string, data: TUpdateAccount) => {
    const url = `/account/update?id=${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },

  updateRole: async (id: string, role: RoleEnum) => {
    const url = `/account/${id}/rank/${role}`;
    const res = await axiosClient.patch(url, role);
    return res.data;
  },

  updatePassword: async (id: string, data: TUpdatePassword) => {
    const url = `/account/${id}/reset-password`;
    const res = await axiosClient.put(url, data);
    return res.data;
  },

  deleteAccount: async (id: string) => {
    const url = `/account/delete?id=${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },

  changeStatusAccount: async (id: string, isLogin: boolean) => {
    const url = `/account/${id}/can-login/${isLogin}`;
    const res = await axiosClient.patch(url);
    return res.data;
  },


  updateDeviceList: async (id: string, listDevices: string[]) => {
    const url = `/account/${id}/list-device`;
    const res = await axiosClient.put(url, { listDevices });
    return res.data;
  },
};
