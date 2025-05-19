import { TPage } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TCategory, TCreateCategory } from '@/interface/TCategory';
import { categoryApi } from '@/api/categoryApi';

type useQueryCategoryWarehouseOptions = Omit<
  UseQueryOptions<TPage<TCategory>>,
  'queryKey' | 'queryFn'
>;

export const useQueryCategoryWarehouse = (
  params: string,
  options?: useQueryCategoryWarehouseOptions
) => {
  const queryClient = useQueryClient();

  // Lấy danh sách Category Warehouse
  const getAllCategoryWarehouse = useQuery({
    ...options,
    queryKey: [QueryKeys.CATEGORY_WAREHOUSE, params],
    queryFn: () => categoryApi.getAllCategoryWarehouse(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Tạo mới Category Warehouse
  const createCategoryWarehouse = useMutation({
    mutationFn: (data: TCreateCategory) => categoryApi.createCategoryWarehouse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CATEGORY_WAREHOUSE] });
      toast.success('Thêm danh mục kho mới thành công');
    },
    onError: () => {
      toast.error('Thêm danh mục kho thất bại');
    },
  });

  // Xóa Category Warehouse
  const deleteCategoryWarehouse = useMutation({
    mutationFn: (id: string) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CATEGORY_WAREHOUSE] });
      toast.success('Xóa danh mục kho thành công');
    },
    onError: () => {
      toast.error('Xóa danh mục kho thất bại');
    },
  });

  // Cập nhật Category Warehouse
  const updateCategoryWarehouse = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TCreateCategory }) =>
      categoryApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CATEGORY_WAREHOUSE] });
      toast.success('Cập nhật thông tin danh mục kho thành công');
    },
    onError: () => {
      toast.error('Cập nhật danh mục kho thất bại');
    },
  });

  return {
    getAllCategoryWarehouse,
    createCategoryWarehouse,
    deleteCategoryWarehouse,
    updateCategoryWarehouse,
  };
};
