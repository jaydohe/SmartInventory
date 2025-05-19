import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { employeeApi } from '@/api/employeeApi';
import { TCreateEmployee, TEmployee, TUpdateEmployee } from '@/interface/TEmployee';

type useQueryEmployeeOptions = Omit<UseQueryOptions<TPage<TEmployee>>, 'queryKey' | 'queryFn'>;
type useQueryDetailEmployeeOptions = Omit<
  UseQueryOptions<TResponse<TEmployee>>,
  'queryKey' | 'queryFn'
>;

export const useQueryEmployee = (params: string, options?: useQueryEmployeeOptions) => {
  const queryClient = useQueryClient();

  // Lấy danh sách Employee
  const getAllEmployee = useQuery({
    ...options,
    queryKey: [QueryKeys.GET_ALL_EMPLOYEE, params],
    queryFn: () => employeeApi.getAll(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  // Tạo mới Employee
  const createEmployee = useMutation({
    mutationFn: (data: TCreateEmployee) => employeeApi.createEmployee(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_EMPLOYEE] });
      toast.success('Thêm nhân viên mới thành công');
    },
    onError: () => {
      toast.error('Thêm nhân viên thất bại');
    },
  });

  // Xóa Employee
  const deleteEmployee = useMutation({
    mutationFn: (id: string) => employeeApi.deleteEmployee(id),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_EMPLOYEE] });
      toast.success('Xóa nhân viên thành công');
    },
  });

  // Cập nhật Employee
  const updateEmployee = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdateEmployee }) =>
      employeeApi.updateEmployee(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_EMPLOYEE] });
      toast.success('Cập nhật thông tin nhân viên thành công');
    },
  });

  return { getAllEmployee, createEmployee, deleteEmployee, updateEmployee };
};

export const useQueryDetailEmployee = (id: string, options?: useQueryDetailEmployeeOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_EMPLOYEE, id],
    queryFn: () => employeeApi.getDetail(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });
};
