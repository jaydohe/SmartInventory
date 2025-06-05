import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { warehouseListApi } from '@/api/warehouseListApi';
import { TPage, TResponse } from '@/interface';
import { TCreateWarehouse, TWarehouse } from '@/interface/TWarehouse';
import { QueryKeys } from '@/Constant';
import { toast } from 'react-toastify';

type useQueryWarehouseOptions = Omit<UseQueryOptions<TPage<TWarehouse>>, 'queryKey' | 'queryFn'>;
type useQueryDetailWarehouseOptions = Omit<
  UseQueryOptions<TResponse<TWarehouse>>,
  'queryKey' | 'queryFn'
>;

export const useQueryWarehouse = (params: string, options?: useQueryWarehouseOptions) => {
  const queryClient = useQueryClient();
  const getAllWarehouse = useQuery({
    ...options,
    queryKey: [QueryKeys.GET_ALL_WAREHOUSE, params],
    queryFn: () => warehouseListApi.getAll(params),
    // enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });

  const createWarehouse = useMutation({
    mutationFn: (data: TCreateWarehouse) => warehouseListApi.createWarehouse(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_WAREHOUSE, params] });
      toast.success('Tạo kho mới thành công');
    },
  });

  const updateWarehouse = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TWarehouse }) =>
      warehouseListApi.updateWarehouse(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_WAREHOUSE] });
      toast.success('Cập nhật kho thành công');
    },
  });

  const deleteWarehouse = useMutation({
    mutationFn: (id: string) => warehouseListApi.deleteWarehouse(id),
    onSuccess: (_) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_WAREHOUSE] });
      toast.success('Xóa kho thành công');
    },
  });

  return { getAllWarehouse, createWarehouse, updateWarehouse, deleteWarehouse };
};

export const useQueryDetailWarehouse = (id: string, options?: useQueryDetailWarehouseOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_WAREHOUSE, id],
    queryFn: () => warehouseListApi.getDetail(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });
};
