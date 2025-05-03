import { TPage, TResponse } from '@/interface';
import { TUser, TCreateUser, TUpdateUser, TUpdatePassword } from '@/interface/TUser';

import axiosClient from './AxiosClient';
import { RoleEnum, RoleEnumString } from '@/Constant';

export const userListApi = {
  getAll: async (params: string): Promise<TPage<TUser>> => {
    const url = `/api/v1/user?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetail: async (id: string): Promise<TResponse<TUser>> => {
    const url = `/api/v1/user/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  createUser: async (data: TCreateUser) => {
    const url = 'api/v1/user';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  createUserByUnit: async (data: TCreateUser) => {
    const url = '/api/v1/zunit/user';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  deleteUser: async (id: string) => {
    const url = `/api/v1/user/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
  updateUser: async (id: string, data: TUpdateUser) => {
    const url = `/api/v1/user/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  updateRole: async (id: string, role: RoleEnumString) => {
    const url = `/api/v1/user/${id}/role/${role}`;
    const res = await axiosClient.patch(url, role);
    return res.data;
  },
  updatePassword: async (id: string, data: TUpdatePassword) => {
    const url = `/api/v1/user/${id}/reset-password`;
    const res = await axiosClient.put(url, data);
    return res.data;
  },
  changeStatus: async (id: string) => {
    const url = `/api/v1/user/${id}/is-login`;
    const res = await axiosClient.patch(url);
    return res.data;
  },
};
