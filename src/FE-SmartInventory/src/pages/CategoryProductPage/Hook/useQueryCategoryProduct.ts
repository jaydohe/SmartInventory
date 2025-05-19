import { TPage } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TCategory, TCreateCategory } from '@/interface/TCategory';
import { categoryApi } from '@/api/categoryApi';

type useQueryCategoryProductOptions = Omit<
  UseQueryOptions<TPage<TCategory>>,
  'queryKey' | 'queryFn'
>;

export const useQueryCategoryProduct = (
  params: string,
  options?: useQueryCategoryProductOptions
) => {
  const queryClient = useQueryClient();

  // Lấy danh sách Category Product
  const getAllCategoryProduct = useQuery({
    ...options,
    queryKey: [QueryKeys.CATEGORY_PRODUCT, params],
    queryFn: () => categoryApi.getAllCategoryProduct(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Tạo mới Category Product
  const createCategoryProduct = useMutation({
    mutationFn: (data: TCreateCategory) => categoryApi.createCategoryProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CATEGORY_PRODUCT] });
      toast.success('Thêm danh mục sản phẩm mới thành công');
    },
    onError: () => {
      toast.error('Thêm danh mục sản phẩm thất bại');
    },
  });

  // Xóa Category Product
  const deleteCategoryProduct = useMutation({
    mutationFn: (id: string) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CATEGORY_PRODUCT] });
      toast.success('Xóa danh mục sản phẩm thành công');
    },
    onError: () => {
      toast.error('Xóa danh mục sản phẩm thất bại');
    },
  });

  // Cập nhật Category Product
  const updateCategoryProduct = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TCreateCategory }) =>
      categoryApi.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CATEGORY_PRODUCT] });
      toast.success('Cập nhật thông tin danh mục sản phẩm thành công');
    },
    onError: () => {
      toast.error('Cập nhật danh mục sản phẩm thất bại');
    },
  });

  return {
    getAllCategoryProduct,
    createCategoryProduct,
    deleteCategoryProduct,
    updateCategoryProduct,
  };
};
