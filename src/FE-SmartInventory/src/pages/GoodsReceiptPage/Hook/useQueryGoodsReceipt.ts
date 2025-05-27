import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  TGoodsReceipt,
  TGoodsReceiptCreateMaterial,
  TGoodsReceiptCreateOrder,
  TGoodsReceiptCreateProductionCommand,
  TGoodsReceiptUpdate,
} from '@/interface/TGoodsReceipt';
import { GoodsReceiptApi } from '@/api/goodsReceiptApi';

type useQueryGoodsReceiptOptions = Omit<
  UseQueryOptions<TPage<TGoodsReceipt>>,
  'queryKey' | 'queryFn'
>;

export const useQueryGoodsReceipt = (params: string, options?: useQueryGoodsReceiptOptions) => {
  const queryClient = useQueryClient();

  // Lấy danh sách phiếu nhập hàng
  const getAllGoodsReceipt = useQuery({
    ...options,
    queryKey: [QueryKeys.GOODS_RECEIPT, params],
    queryFn: () => GoodsReceiptApi.getAll(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Lấy chi tiết phiếu nhập hàng
  const getGoodsReceiptDetail = (id: string) =>
    useQuery({
      queryKey: [QueryKeys.GOODS_RECEIPT_DETAIL, id, params],
      queryFn: () => GoodsReceiptApi.getDetail(id, params),
      enabled: !!id && !!params,
      placeholderData: (prevData) => prevData,
      retry: 3,
      staleTime: 5 * 60 * 1000,
    });

  // Thêm phiếu nhập hàng từ nhà cung cấp NVL
  const createGoodsReceiptByMaterial = useMutation({
    mutationFn: (data: TGoodsReceiptCreateMaterial) =>
      GoodsReceiptApi.createGoodsReceiptByMaterial(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GOODS_RECEIPT] });
      toast.success('Thêm phiếu nhập NVL thành công');
    },
    onError: () => {
      toast.error('Thêm phiếu nhập NVL thất bại');
    },
  });

  // Thêm phiếu nhập hàng từ đơn hàng
  const createGoodsReceiptByOrder = useMutation({
    mutationFn: (data: TGoodsReceiptCreateOrder) => GoodsReceiptApi.createGoodsReceiptByOrder(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GOODS_RECEIPT] });
      toast.success('Thêm phiếu nhập từ đơn hàng thành công');
    },
    onError: () => {
      toast.error('Thêm phiếu nhập từ đơn hàng thất bại');
    },
  });

  // Thêm phiếu nhập hàng từ lệnh sản xuất
  const createGoodsReceiptByProductionCommand = useMutation({
    mutationFn: (data: TGoodsReceiptCreateProductionCommand) =>
      GoodsReceiptApi.createGoodsReceiptByProductionCommand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GOODS_RECEIPT] });
      toast.success('Thêm phiếu nhập từ lệnh sản xuất thành công');
    },
    onError: () => {
      toast.error('Thêm phiếu nhập từ lệnh sản xuất thất bại');
    },
  });

  // Cập nhật trạng thái phiếu nhập hàng
  const updateGoodsReceiptStatus = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TGoodsReceiptUpdate }) =>
      GoodsReceiptApi.updateGoodsReceiptStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GOODS_RECEIPT] });
      toast.success('Cập nhật trạng thái phiếu nhập thành công');
    },
    onError: () => {
      toast.error('Cập nhật trạng thái phiếu nhập thất bại');
    },
  });

  // Xóa phiếu nhập hàng
  const deleteGoodsReceipt = useMutation({
    mutationFn: (id: string) => GoodsReceiptApi.deleteGoodsReceipt(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GOODS_RECEIPT] });
      toast.success('Xóa phiếu nhập thành công');
    },
    onError: () => {
      toast.error('Xóa phiếu nhập thất bại');
    },
  });

  return {
    getAllGoodsReceipt,
    getGoodsReceiptDetail,
    createGoodsReceiptByMaterial,
    createGoodsReceiptByOrder,
    createGoodsReceiptByProductionCommand,
    updateGoodsReceiptStatus,
    deleteGoodsReceipt,
  };
};
