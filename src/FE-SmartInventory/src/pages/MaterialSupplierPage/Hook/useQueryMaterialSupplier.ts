import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  TMaterialSupplier,
  TMaterialSupplierCreate,
  TMaterialSupplierUpdate,
} from '@/interface/TMaterialSupplier';
import { MaterialSupplierApi } from '@/api/materialSupplierApi';

type useQueryMaterialSupplierOptions = Omit<
  UseQueryOptions<TPage<TMaterialSupplier>>,
  'queryKey' | 'queryFn'
>;

export const useQueryMaterialSupplier = (
  params: string,
  options?: useQueryMaterialSupplierOptions
) => {
  const queryClient = useQueryClient();

  // Lấy danh sách Material Supplier
  const getAllMaterialSupplier = useQuery({
    ...options,
    queryKey: [QueryKeys.MATERIAL_SUPPLIER, params],
    queryFn: () => MaterialSupplierApi.getAllMaterialSupplier(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Tạo mới Material Supplier
  const createMaterialSupplier = useMutation({
    mutationFn: (data: TMaterialSupplierCreate) => MaterialSupplierApi.createMaterialSupplier(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MATERIAL_SUPPLIER] });
      toast.success('Thêm nhà cung cấp mới thành công');
    },
    onError: () => {
      toast.error('Thêm nhà cung cấp thất bại');
    },
  });

  // Xóa Material Supplier
  const deleteMaterialSupplier = useMutation({
    mutationFn: (id: string) => MaterialSupplierApi.deleteMaterialSupplier(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MATERIAL_SUPPLIER] });
      toast.success('Xóa nhà cung cấp thành công');
    },
    onError: () => {
      toast.error('Xóa nhà cung cấp thất bại');
    },
  });

  // Cập nhật Material Supplier
  const updateMaterialSupplier = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TMaterialSupplierUpdate }) =>
      MaterialSupplierApi.updateMaterialSupplier(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.MATERIAL_SUPPLIER] });
      toast.success('Cập nhật thông tin nhà cung cấp thành công');
    },
    onError: () => {
      toast.error('Cập nhật thông tin nhà cung cấp thất bại');
    },
  });

  return {
    getAllMaterialSupplier,
    createMaterialSupplier,
    deleteMaterialSupplier,
    updateMaterialSupplier,
  };
};
