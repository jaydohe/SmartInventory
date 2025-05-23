import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TCreateGoodsIssue, TGoodsIssue, TUpdateGoodsIssueStatus } from '@/interface/TGoodsIssuse';
import { goodsIssueApi } from '@/api/goodsIssueApi';

type useQueryGoodsIssueOptions = Omit<UseQueryOptions<TPage<TGoodsIssue>>, 'queryKey' | 'queryFn'>;

export const useQueryGoodsIssue = (params: string, options?: useQueryGoodsIssueOptions) => {
  const queryClient = useQueryClient();

  // Lấy danh sách phiếu xuất hàng
  const getAllGoodsIssue = useQuery({
    ...options,
    queryKey: [QueryKeys.GOODS_ISSUE, params],
    queryFn: () => goodsIssueApi.getAll(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Lấy chi tiết phiếu xuất hàng
  const getGoodsIssueDetail = (id: string) =>
    useQuery({
      queryKey: [QueryKeys.GOODS_ISSUE_DETAIL, id, params],
      queryFn: () => goodsIssueApi.getDetail(id, params),
      enabled: !!id && !!params,
      placeholderData: (prevData) => prevData,
      retry: 3,
      staleTime: 5 * 60 * 1000,
    });

  // Tạo phiếu xuất hàng
  const createGoodsIssue = useMutation({
    mutationFn: (data: TCreateGoodsIssue) => goodsIssueApi.createGoodsIssue(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GOODS_ISSUE] });
      toast.success('Thêm phiếu xuất hàng thành công');
    },
    onError: () => {
      toast.error('Thêm phiếu xuất hàng thất bại');
    },
  });

  // Cập nhật trạng thái phiếu xuất hàng
  const updateGoodsIssueStatus = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdateGoodsIssueStatus }) =>
      goodsIssueApi.updateGoodsIssueStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GOODS_ISSUE] });
      toast.success('Cập nhật trạng thái phiếu xuất thành công');
    },
    onError: () => {
      toast.error('Cập nhật trạng thái phiếu xuất thất bại');
    },
  });

  // Xóa phiếu xuất hàng
  const deleteGoodsIssue = useMutation({
    mutationFn: (id: string) => goodsIssueApi.deleteGoodsIssue(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.GOODS_ISSUE] });
      toast.success('Xóa phiếu xuất thành công');
    },
    onError: () => {
      toast.error('Xóa phiếu xuất thất bại');
    },
  });

  return {
    getAllGoodsIssue,
    getGoodsIssueDetail,
    createGoodsIssue,
    updateGoodsIssueStatus,
    deleteGoodsIssue,
  };
};
