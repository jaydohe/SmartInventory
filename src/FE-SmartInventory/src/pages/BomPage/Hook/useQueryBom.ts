import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { bomApi } from '@/api/bomApi';
import { TBom, TBomCreate, TBomUpdate } from '@/interface/TBom';

export const useQueryBom = (params: string) => {
  const queryClient = useQueryClient();

  const getAllBom = useQuery({
    queryKey: ['getAllBom', params],
    queryFn: () => bomApi.getAllBom(params),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const getBomById = (id: string) =>
    useQuery({
      queryKey: ['getBomById', id],
      queryFn: () => bomApi.getBomById(id),
      enabled: !!id,
      refetchOnWindowFocus: false,
    });

  const createBom = useMutation({
    mutationFn: (data: TBomCreate) => bomApi.createBom(data),
    onSuccess: () => {
      message.success('Tạo định mức thành công!');
      queryClient.invalidateQueries({ queryKey: ['getAllBom'] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Tạo định mức thất bại!');
    },
  });

  const updateBom = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TBomUpdate }) => bomApi.updateBom(id, data),
    onSuccess: () => {
      message.success('Cập nhật định mức thành công!');
      queryClient.invalidateQueries({ queryKey: ['getAllBom'] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Cập nhật định mức thất bại!');
    },
  });

  const deleteBom = useMutation({
    mutationFn: (id: string) => bomApi.deleteBom(id),
    onSuccess: () => {
      message.success('Xóa định mức thành công!');
      queryClient.invalidateQueries({ queryKey: ['getAllBom'] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Xóa định mức thất bại!');
    },
  });

  return {
    getAllBom,
    getBomById,
    createBom,
    updateBom,
    deleteBom,
  };
};
