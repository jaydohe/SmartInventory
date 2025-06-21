import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';

import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { TInventory, TInventoryByProduct, TInventoryUpdate } from '@/interface/TInventory';

import { inventoryApi } from '@/api/inventoryApi';
import { toast } from 'react-toastify';

type useQueryInventoryOptions = Omit<UseQueryOptions<TPage<TInventory>>, 'queryKey' | 'queryFn'>;
type useQueryInventoryByProductOptions = Omit<
  UseQueryOptions<TInventoryByProduct[]>,
  'queryKey' | 'queryFn'
>;

export const useQueryInventory = (params: string, options?: useQueryInventoryOptions) => {
  const queryClient = useQueryClient();

  // Lấy danh sách tồn kho
  const getAllInventory = useQuery({
    ...options,
    queryKey: [QueryKeys.INVENTORY, params],
    queryFn: () => inventoryApi.getAllInventory(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  const updateInventory = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TInventoryUpdate }) =>
      inventoryApi.updateInventory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.INVENTORY_BY_PRODUCT] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.INVENTORY] });
      toast.success('Cập nhật tồn kho thành công');
    },
    onError: () => {
      toast.error('Cập nhật tồn kho thất bại');
    },
  });

  return {
    getAllInventory,
    updateInventory,
  };
};

export const getInventoryByProduct = (id: string, options?: useQueryInventoryByProductOptions) => {
  return useQuery({
    queryKey: [QueryKeys.INVENTORY_BY_PRODUCT, id],
    queryFn: () => inventoryApi.getInventoryByProduct(id),
    enabled: !!id,
    ...options,
  });
};
