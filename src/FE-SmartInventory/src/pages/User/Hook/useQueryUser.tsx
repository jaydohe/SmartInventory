import { TPage, TResponse } from '@/interface';

import { QueryKeys, RoleEnum, RoleEnumString } from '@/Constant';

import { TUser, TCreateUser, TUpdateUser, TUpdatePassword } from '@/interface/TUser';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { userListApi } from '@/api/userListApi';
import { toast } from 'react-toastify';

type useQueryUserOptions = Omit<UseQueryOptions<TPage<TUser>>, 'queryKey' | 'queryFn'>;

type useQueryDetailUserOptions = Omit<UseQueryOptions<TResponse<TUser>>, 'queryKey' | 'queryFn'>;
export const useQueryUser = (params: string, options?: useQueryUserOptions) => {
  const queryClient = useQueryClient();
  const getAllUser = useQuery({
    ...options,
    queryKey: [QueryKeys.GET_ALL_USER, params],
    queryFn: () => userListApi.getAll(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });

  const createUser = useMutation({
    mutationFn: (data: TCreateUser) => userListApi.createUser(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USER, params] });
      toast.success('Thêm người dùng mới thành công');
    },
  });

  const createUserByUnit = useMutation({
    mutationFn: (data: TCreateUser) => userListApi.createUserByUnit(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USER, params] });
      toast.success('Thêm người dùng mới thành công');
    },
  });

  const deleteUser = useMutation({
    mutationFn: (id: string) => userListApi.deleteUser(id),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USER] });
      toast.success('Xóa người dùng thành công');
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdateUser }) =>
      userListApi.updateUser(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USER] });
      toast.success('Cập nhật thông tin người dùng');
    },
  });

  const updateRole = useMutation({
    mutationFn: ({ id, role }: { id: string; role: RoleEnumString }) =>
      userListApi.updateRole(id, role),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USER] });
      toast.success('Cập nhật quyền cho người dùng thành công');
    },
  });

  const updatePassword = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdatePassword }) =>
      userListApi.updatePassword(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USER] });
      toast.success('Cập nhật mật khẩu thành công');
    },
  });

  const changeStatus = useMutation({
    mutationFn: (id: string) => userListApi.changeStatus(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USER] });
      toast.success('Thay đổi trạng thái người dùng thành công');
    },
  });

  return {
    getAllUser,
    createUser,
    createUserByUnit,
    deleteUser,
    updateUser,
    updateRole,
    updatePassword,
    changeStatus,
  };
};

export const useQueryDetailUser = (id: string, options?: useQueryDetailUserOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_USER, id],
    queryFn: () => userListApi.getDetail(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });
};
