import { QueryKeys } from '@/Constant';
import { authZLightApi } from '@/api';

import { TLoginForm, TRefreshTokenFrom, TRegister } from '@/interface';
import { IUpdatePasswordSelf, IUpdateUserInfo } from '@/interface/ISelf';

import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useRefreshToken = (data: TRefreshTokenFrom) => {
  return useQuery({
    queryKey: [QueryKeys.REFRESH_TOKEN],
    queryFn: () => authZLightApi.refreshTokenApi(data),
    placeholderData: (previousData) => previousData,
    retry: 3,
  });
};

export const useLoginNew = () => {
  const login = useMutation({
    mutationFn: (data: TLoginForm) => authZLightApi.LoginNew(data),
  });

  return { login };
};

export const useRegisterAccount = () => {
  return useMutation({
    mutationFn: (data: TRegister) => authZLightApi.registerAccount(data),
    onSuccess: (data) => {
      toast.success('Đăng ký tài khoản thành công');
    },
  });
};

export const getUserInfo = () => {
  const getInfo = useQuery({
    queryKey: [QueryKeys.GET_INFO_USER],
    queryFn: () => authZLightApi.GetInfoUser(),
    placeholderData: (previousData) => previousData,
    retry: 3,
  });
  const updatePassWord = useMutation({
    mutationFn: (data: IUpdatePasswordSelf) => authZLightApi.updatePassword(data),
    onSuccess: (data) => {
      toast.success('Cập nhật mật khẩu thành công');
    },
  });

  const updateUserInfo = useMutation({
    mutationFn: (data: IUpdateUserInfo) => authZLightApi.updateUserInfo(data),
    onSuccess: (data) => {
      toast.success('Cập nhật thông tin người dùng thành công');
    },
  });

  return { getInfo, updatePassWord, updateUserInfo };
};
