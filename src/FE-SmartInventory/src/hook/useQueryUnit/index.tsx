import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { unitListApi } from '@/api/unitListApi';
import { TPage, TResponse } from '@/interface';
import { TUnit } from '@/interface/TUnit';
import { QueryKeys } from '@/Constant';
import { toast } from 'react-toastify';

type useQueryUnitOptions = Omit<UseQueryOptions<TPage<TUnit>>, 'queryKey' | 'queryFn'>;
type useQueryDetailUnitOptions = Omit<UseQueryOptions<TResponse<TUnit>>, 'queryKey' | 'queryFn'>;

export const useQueryUnit = (params: string, options?: useQueryUnitOptions) => {
  const queryClient = useQueryClient();
  const getAllUnit = useQuery({
    ...options,
    queryKey: [QueryKeys.GET_ALL_UNIT, params],
    queryFn: () => unitListApi.getAll(params),
    // enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });

  const createUnit = useMutation({
    mutationFn: (data: TUnit) => unitListApi.createUnit(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_UNIT, params] });
      toast.success('Tạo đơn vị mới thành công');
    },
  });

  const updateUnit = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUnit }) => unitListApi.updateUnit(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_UNIT] });
      toast.success('Cập nhật đơn vị thành công');
    },
  });

  const deleteUnit = useMutation({
    mutationFn: (id: string) => unitListApi.deleteUnit(id),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_UNIT] });
      toast.success('Xóa đơn vị thành công');
    },
  });

  return { getAllUnit, createUnit, updateUnit, deleteUnit };
};

export const useQueryDetailUnit = (id: string, options?: useQueryDetailUnitOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_UNIT, id],
    queryFn: () => unitListApi.getDetail(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });
};