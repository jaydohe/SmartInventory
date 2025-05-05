import { TPage, TResponse } from '@/interface';

import { QueryKeys, RoleEnum, RoleEnumString } from '@/Constant';

import { TAgency, TCreateAgency, TUpdateAgency } from '@/interface/TAgency';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { agencyListApi } from '@/agencyListApi';
import { toast } from 'react-toastify';

type useQueryAgencyOptions = Parameters<typeof useQuery>[0];
type useQueryDetailAgencyOptions = Omit<UseQueryOptions<TResponse<TAgency>>, 'queryKey' | 'queryFn'>;

export const useQueryAgency = (params: string, options?: useQueryAgencyOptions) => {
  const queryClient = useQueryClient();
  // Lấy danh sách Agency
  const getAllAgency = useQuery({
    ...options,
    queryKey: [QueryKeys.GET_ALL_AGENCY, params],
    queryFn: () => agencyListApi.getAll(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });

  // Tạo mới Agency
  const createAgency = useMutation({
    mutationFn: (data: TCreateAgency) => agencyListApi.createAgency(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_AGENCY, params] });
      toast.success('Thêm đại lý mới thành công');
    },
    onError: () => {
      toast.error('Thêm đại lý thất bại');
    },
  });
  // Xóa Agency
  const deleteAgency = useMutation({
      mutationFn: (id: string) => agencyListApi.deleteUser(id),
      onSuccess: (_) => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USER] });
        toast.success('Xóa đại lý thành công');
      },
    });
  // Cập nhật đại lý
  const updateAgency = useMutation({
      mutationFn: ({ id, data }: { id: string; data: TUpdateAgency }) =>
        agencyListApi.updateAgency(id, data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_USER] });
        toast.success('Cập nhật thông tin đại lý');
      },
    });

  return { getAllAgency, createAgency, deleteAgency, updateAgency };
};

export const useQueryDetailAgency = (id: string, options?: useQueryDetailAgencyOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_USER, id],
    queryFn: () => agencyListApi.getDetail(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });
};