import { TLoginForm, TLoginResponse, TRefreshTokenFrom, TRegister, TResponse } from '@/interface';
import axiosClient from './AxiosClient';
import { ISelfRes, IUpdatePasswordSelf, IUpdateUserInfo } from '@/interface/ISelf';

export const authSmartInventoryApi = {
  refreshTokenApi: async (token: TRefreshTokenFrom): Promise<TResponse<TLoginResponse>> => {
    const url = `/api/v1/auth/refresh-token`;
    const res = await axiosClient.post(`${url}`, token);
    return res.data;
  },
  LoginNew: async (data: TLoginForm): Promise<TResponse<TLoginResponse>> => {
    const url = `/api/v1/auth/login`;
    const res = await axiosClient.post(`${url}`, data);
    return res.data;
  },

  GetInfoUser: async (): Promise<TResponse<ISelfRes>> => {
    const url = `/api/v1/auth/get-me`;
    const res = await axiosClient.get(`${url}`);
    return res.data;
  },

  updatePassword: async (data: IUpdatePasswordSelf) => {
    const url = `/api/v1/auth/update-password`;
    const res = await axiosClient.put(`${url}`, data);
    return res.data;
  },

  updateUserInfo: async (data: IUpdateUserInfo) => {
    const url = `/api/v1/auth/update-meInfo`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },

  registerAccount: async (data: TRegister) => {
    const { confirmPassword, ...rest } = data;
    const url = '/api/v1/public/signin';
    const res = await axiosClient.post(url, rest);
    return res.data;
  },
};
