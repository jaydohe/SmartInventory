import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TCreateOrder, TOrder, TUpdateOrderStatus } from '@/interface/TOder';
import { orderApi } from '@/api/orderApi';

type useQueryOrderOptions = Omit<UseQueryOptions<TPage<TOrder>>, 'queryKey' | 'queryFn'>;

export const useQueryOrder = (params: string, options?: useQueryOrderOptions) => {
  const queryClient = useQueryClient();

  // Lấy danh sách đơn hàng
  const getAllOrder = useQuery({
    ...options,
    queryKey: [QueryKeys.ORDER, params],
    queryFn: () => orderApi.getAll(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Lấy chi tiết đơn hàng
  const getOrderDetail = (id: string) =>
    useQuery({
      queryKey: [QueryKeys.ORDER_DETAIL, id],
      queryFn: () => orderApi.getDetail(id),
      enabled: !!id,
      placeholderData: (prevData) => prevData,
      retry: 3,
      staleTime: 5 * 60 * 1000,
    });

  // Tạo mới đơn hàng
  const createOrder = useMutation({
    mutationFn: (data: TCreateOrder) => orderApi.createOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ORDER] });
      toast.success('Thêm đơn hàng mới thành công');
    },
    onError: () => {
      toast.error('Thêm đơn hàng thất bại');
    },
  });

  // Cập nhật trạng thái đơn hàng
  const updateOrderStatus = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdateOrderStatus }) =>
      orderApi.updateOrderStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ORDER] });
      toast.success('Cập nhật trạng thái đơn hàng thành công');
    },
    onError: () => {
      toast.error('Cập nhật trạng thái đơn hàng thất bại');
    },
  });

  // Xóa đơn hàng
  const deleteOrder = useMutation({
    mutationFn: (id: string) => orderApi.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ORDER] });
      toast.success('Xóa đơn hàng thành công');
    },
    onError: () => {
      toast.error('Xóa đơn hàng thất bại');
    },
  });

  return {
    getAllOrder,
    getOrderDetail,
    createOrder,
    updateOrderStatus,
    deleteOrder,
  };
};
