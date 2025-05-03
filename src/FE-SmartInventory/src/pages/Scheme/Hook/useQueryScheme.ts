import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { schemeListApi } from '@/api/schemeListApi';
import { TPage, TResponse } from '@/interface';
import { TScheme } from '@/interface/TScheme';
import { QueryKeys } from '@/Constant';
import { toast } from 'react-toastify';

type useQuerySchemeOptions = Omit<UseQueryOptions<TPage<TScheme>>, 'queryKey' | 'queryFn'>;
type useQueryDetailSchemeOptions = Omit<
  UseQueryOptions<TResponse<TScheme>>,
  'queryKey' | 'queryFn'
>;

export const useQueryScheme = (
  params: string,

  options?: useQuerySchemeOptions
) => {
  const queryClient = useQueryClient();
  const getAllScheme = useQuery({
    ...options,
    queryKey: [QueryKeys.GET_ALL_SCHEME, params],
    queryFn: () => schemeListApi.getAll(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });

  const createScheme = useMutation({
    mutationFn: (data: TScheme) => schemeListApi.createScheme(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_SCHEME, params] });
      toast.success('Tạo kế hoạch mới thành công');
    },
  });

  const deleteScheme = useMutation({
    mutationFn: (id: string) => schemeListApi.deleteScheme(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_SCHEME, params] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ACTIVITY],
      });
      toast.success('Xoá kế hoạch mới thành công');
    },
  });
  const updateScheme = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TScheme }) =>
      schemeListApi.updateScheme(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_SCHEME] });
      toast.success('Cập nhật kế hoạch thành công');
    },
  });

  const updateProcess = useMutation({
    mutationFn: ({ id, percent }: { id: string; percent: number }) =>
      schemeListApi.updateProcess(id, percent),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_SCHEME] });
      toast.success('Cập nhật tiến độ kế hoạch thành công');
    },
  });

  const assignUser = useMutation({
    mutationFn: ({ id, userIds }: { id: string; userIds: string[] }) =>
      schemeListApi.assignUser(id, userIds),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_SCHEME] });
      toast.success('Phân công kế hoạch thành công');
    },
  });

  const unassignUser = useMutation({
    mutationFn: ({ id, userIds }: { id: string; userIds: string[] }) =>
      schemeListApi.unassignUser(id, userIds),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_SCHEME] });
      toast.success('Thu hồi phân công kế hoạch thành công');
    },
  });

  return {
    getAllScheme,
    createScheme,
    updateScheme,
    updateProcess,
    assignUser,
    unassignUser,
    deleteScheme,
  };
};

export const useQueryDetailScheme = (
  id: string,
  params?: string,
  options?: useQueryDetailSchemeOptions
) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_SCHEME, id, params],
    queryFn: () => schemeListApi.getDetail(id, params),
    enabled: !!id,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });
};
