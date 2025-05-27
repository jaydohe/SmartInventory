import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
  TProductionCommand,
  TProductionCommandCreate,
  TProductionCommandProcessUpdate,
  TProductionCommandRequest,
  TProductionCommandStatusUpdate,
} from '@/interface/TProductionCommand';
import { productionCommandApi } from '@/api/productionCommandApi';

type useQueryProductionCommandOptions = Omit<
  UseQueryOptions<TPage<TProductionCommand>>,
  'queryKey' | 'queryFn'
>;

export const useQueryProductionCommand = (
  params: string,
  options?: useQueryProductionCommandOptions
) => {
  const queryClient = useQueryClient();

  // Lấy danh sách lệnh sản xuất
  const getAllProductionCommand = useQuery({
    ...options,
    queryKey: [QueryKeys.PRODUCTION_COMMAND, params],
    queryFn: () => productionCommandApi.getAllProductionCommand(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 1,
    staleTime: 3 * 60 * 1000,
  });

  // Lấy chi tiết lệnh sản xuất
  const getProductionCommandDetail = (id: string) =>
    useQuery({
      queryKey: [QueryKeys.PRODUCTION_COMMAND_DETAIL, id, params],
      queryFn: () => productionCommandApi.getDetail(id, params),
      enabled: !!id && !!params,
      placeholderData: (prevData) => prevData,
      retry: 3,
      staleTime: 5 * 60 * 1000,
    });

  // Tạo mới lệnh sản xuất
  const createProductionCommand = useMutation({
    mutationFn: (data: TProductionCommandCreate) =>
      productionCommandApi.createProductionCommand(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTION_COMMAND] });
      toast.success('Thêm lệnh sản xuất mới thành công');
    },
    onError: () => {
      toast.error('Thêm lệnh sản xuất thất bại');
    },
  });

  // Yêu cầu lệnh sản xuất từ đơn hàng
  const createProductionCommandRequest = useMutation({
    mutationFn: (data: TProductionCommandRequest) =>
      productionCommandApi.createProductionCommandRequest(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTION_COMMAND] });
      toast.success('Yêu cầu lệnh sản xuất thành công');
    },
    onError: () => {
      toast.error('Yêu cầu lệnh sản xuất thất bại');
    },
  });

  // Cập nhật trạng thái lệnh sản xuất
  const updateProductionCommandStatus = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TProductionCommandStatusUpdate }) =>
      productionCommandApi.updateProductionCommandStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTION_COMMAND] });
      toast.success('Cập nhật trạng thái lệnh sản xuất thành công');
    },
    onError: () => {
      toast.error('Cập nhật trạng thái lệnh sản xuất thất bại');
    },
  });

  // Cập nhật tiến độ lệnh sản xuất
  const updateProductionCommandProcess = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TProductionCommandProcessUpdate }) =>
      productionCommandApi.updateProductionCommandProcess(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTION_COMMAND] });
      toast.success('Cập nhật tiến độ lệnh sản xuất thành công');
    },
    onError: () => {
      toast.error('Cập nhật tiến độ lệnh sản xuất thất bại');
    },
  });

  // Xóa lệnh sản xuất
  const deleteProductionCommand = useMutation({
    mutationFn: (id: string) => productionCommandApi.deleteProductionCommand(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCTION_COMMAND] });
      toast.success('Xóa lệnh sản xuất thành công');
    },
    onError: () => {
      toast.error('Xóa lệnh sản xuất thất bại');
    },
  });

  return {
    getAllProductionCommand,
    getProductionCommandDetail,
    createProductionCommand,
    createProductionCommandRequest,
    updateProductionCommandStatus,
    updateProductionCommandProcess,
    deleteProductionCommand,
  };
};
