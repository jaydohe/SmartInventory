import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TAgency, TCreateAgency } from '@/interface/TAgency';
import { agencyListApiApi } from '@/api/agencyListApi';

type useQueryAgencyOptions = Omit<UseQueryOptions<TPage<TAgency>>, 'queryKey' | 'queryFn'>;

export const useQueryAgency = (params: string, options?: useQueryAgencyOptions) => {
  const queryClient = useQueryClient();

  // Lấy danh sách Agency
  const getAllAgency = useQuery({
    ...options,
    queryKey: [QueryKeys.AGENCY, params],
    queryFn: () => agencyListApiApi.getAllAgency(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Tạo mới Agency
  const createAgency = useMutation({
    mutationFn: (data: TCreateAgency) => agencyListApiApi.createAgency(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AGENCY] });
      toast.success('Thêm đại lý mới thành công');
    },
    onError: () => {
      toast.error('Thêm đại lý thất bại');
    },
  });

  // Xóa Agency
  const deleteAgency = useMutation({
    mutationFn: (id: string) => agencyListApiApi.deleteAgency(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AGENCY] });
      toast.success('Xóa đại lý thành công');
    },
    onError: () => {
      toast.error('Xóa đại lý thất bại');
    },
  });

  // Cập nhật Agency
  const updateAgency = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TCreateAgency }) =>
      agencyListApiApi.updateAgency(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.AGENCY] });
      toast.success('Cập nhật thông tin đại lý thành công');
    },
    onError: () => {
      toast.error('Cập nhật thông tin đại lý thất bại');
    },
  });

  return { getAllAgency, createAgency, deleteAgency, updateAgency };
};
