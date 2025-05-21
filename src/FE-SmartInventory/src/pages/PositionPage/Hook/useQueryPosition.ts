import { TPage, TResponse } from '@/interface';

import { QueryKeys, RoleEnum, RoleEnumString } from '@/Constant';

import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { employeeApi } from '@/api/employeeApi';
import { TCreateEmployee, TEmployee, TUpdateEmployee } from '@/interface/TEmployee';
import { TCreatePosition, TPosition } from '@/interface/TPosition';
import { positionApi } from '@/api/positionApi';

type useQueryPositionOptions = Omit<UseQueryOptions<TPage<TPosition>>, 'queryKey' | 'queryFn'>;

export const useQueryPosition = (params: string, options?: useQueryPositionOptions) => {
  const queryClient = useQueryClient();
  // Lấy danh sách Employee
  const getAllPosition = useQuery({
    ...options,
    queryKey: [QueryKeys.POSITION, params],
    queryFn: () => positionApi.getAllPosition(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  // Tạo mới Employee
  const createPosition = useMutation({
    mutationFn: (data: TCreatePosition) => positionApi.createPosition(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.POSITION] });
      toast.success('Thêm chức vụ mới thành công');
    },
    onError: () => {
      toast.error('Thêm chức vụ thất bại');
    },
  });
  // Xóa Employee
  const deletePosition = useMutation({
    mutationFn: (id: string) => positionApi.deletePosition(id),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.POSITION] });
      toast.success('Xóa chức vụ thành công');
    },
  });
  // Cập nhật chức vụ
  const updatePosition = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TCreatePosition }) =>
      positionApi.updatePosition(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.POSITION] });
      toast.success('Cập nhật thông tin chức vụ thành công');
    },
  });

  return { getAllPosition, createPosition, deletePosition, updatePosition };
};
