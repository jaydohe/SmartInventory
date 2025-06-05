import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
<<<<<<< Updated upstream
import { useQueryClient, UseQueryOptions, useQuery } from '@tanstack/react-query';
import { TInventory } from '@/interface/TInventory';
=======
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { TInventory, TInventoryByProduct, TInventoryUpdate } from '@/interface/TInventory';
>>>>>>> Stashed changes
import { inventoryApi } from '@/api/inventoryApi';

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

<<<<<<< Updated upstream
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
=======
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
>>>>>>> Stashed changes
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
