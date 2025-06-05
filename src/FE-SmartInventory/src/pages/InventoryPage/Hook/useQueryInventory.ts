import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { TInventory } from '@/interface/TInventory';
import { inventoryApi } from '@/api/inventoryApi';

type useQueryInventoryOptions = Omit<UseQueryOptions<TPage<TInventory>>, 'queryKey' | 'queryFn'>;

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

  // Lấy chi tiết tồn kho
  // const getInventoryDetail = (id: string) =>
  //   useQuery({
  //     queryKey: [QueryKeys.INVENTORY_DETAIL, id, params],
  //     queryFn: () => inventoryApi.getInventoryDetail(id, params),
  //     enabled: !!id && !!params,
  //     placeholderData: (prevData) => prevData,
  //     retry: 3,
  //     staleTime: 5 * 60 * 1000,
  //   });

  // // Lấy lịch sử tồn kho của sản phẩm
  // const getInventoryHistory = (productId: string) =>
  //   useQuery({
  //     queryKey: [QueryKeys.INVENTORY_HISTORY, productId, params],
  //     queryFn: () => inventoryApi.getInventoryHistory(productId, params),
  //     enabled: !!productId && !!params,
  //     placeholderData: (prevData) => prevData,
  //     retry: 3,
  //     staleTime: 5 * 60 * 1000,
  //   });

  return {
    getAllInventory,
    // getInventoryDetail,
  };
};
