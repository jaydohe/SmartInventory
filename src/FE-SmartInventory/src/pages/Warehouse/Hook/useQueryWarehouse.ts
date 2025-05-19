import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TCreateWarehouse, TUpdateWarehouse, TWarehouse } from '@/interface/TWarehouse';
import { warehouseApi } from '@/api/warehouseApi';

type useQueryWarehouseOptions = Omit<UseQueryOptions<TPage<TWarehouse>>, 'queryKey' | 'queryFn'>;
type useQueryDetailWarehouseOptions = Omit<UseQueryOptions<TWarehouse>, 'queryKey' | 'queryFn'>;

export const useQueryWarehousePage = (params: string, options?: useQueryWarehouseOptions) => {
  const queryClient = useQueryClient();

  // Lấy danh sách Warehouse
  const getAllWarehouse = useQuery({
    ...options,
    queryKey: [QueryKeys.GET_ALL_WAREHOUSE, params],
    queryFn: () => warehouseApi.getAllWarehouse(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });

  // Tạo mới Warehouse
  const createWarehouse = useMutation({
    mutationFn: (data: TCreateWarehouse) => warehouseApi.createWarehouse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_WAREHOUSE] });
      toast.success('Thêm kho mới thành công');
    },
    onError: () => {
      toast.error('Thêm kho thất bại');
    },
  });

  // Xóa Warehouse
  const deleteWarehouse = useMutation({
    mutationFn: (id: string) => warehouseApi.deleteWarehouse(id),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_WAREHOUSE] });
      toast.success('Xóa kho thành công');
    },
    onError: () => {
      toast.error('Xóa kho thất bại');
    },
  });

  // Cập nhật Warehouse
  const updateWarehouse = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TCreateWarehouse }) =>
      warehouseApi.updateWarehouse(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_WAREHOUSE] });
      toast.success('Cập nhật thông tin kho thành công');
    },
    onError: () => {
      toast.error('Cập nhật thông tin kho thất bại');
    },
  });

  return { getAllWarehouse, createWarehouse, deleteWarehouse, updateWarehouse };
};

export const useQueryDetailWarehouse = (id: string, options?: useQueryDetailWarehouseOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_WAREHOUSE, id],
    queryFn: () => warehouseApi.getWarehouseById(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });
};
