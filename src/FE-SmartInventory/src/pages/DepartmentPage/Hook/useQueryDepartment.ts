import { TPage, TResponse } from '@/interface';

import { QueryKeys, RoleEnum, RoleEnumString } from '@/Constant';

import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TCreateDepartment, TDepartment } from '@/interface/TDepartment';
import { departmentApi } from '@/api/departmentApi';

type useQueryDepartmentOptions = Omit<UseQueryOptions<TPage<TDepartment>>, 'queryKey' | 'queryFn'>;

export const useQueryDepartment = (params: string, options?: useQueryDepartmentOptions) => {
  const queryClient = useQueryClient();
  // Lấy danh sách Department
  const getAllDepartment = useQuery({
    ...options,
    queryKey: [QueryKeys.DEPARTMENT, params],
    queryFn: () => departmentApi.getAllDepartment(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Tạo mới Department
  const createDepartment = useMutation({
    mutationFn: (data: TCreateDepartment) => departmentApi.createDepartment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.DEPARTMENT] });
      toast.success('Thêm phòng ban mới thành công');
    },
    onError: () => {
      toast.error('Thêm phòng ban thất bại');
    },
  });
  // Xóa Department
  const deleteDepartment = useMutation({
    mutationFn: (id: string) => departmentApi.deleteDepartment(id),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.DEPARTMENT] });
      toast.success('Xóa phòng ban thành công');
    },
  });
  // Cập nhật Department
  const updateDepartment = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TCreateDepartment }) =>
      departmentApi.updateDepartment(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.DEPARTMENT] });
      toast.success('Cập nhật thông tin phòng ban thành công');
    },
  });

  return { getAllDepartment, createDepartment, deleteDepartment, updateDepartment };
};
