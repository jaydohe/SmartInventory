import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TCreateProduct, TProduct, TUpdateProduct } from '@/interface/TProduct';
import { productApi } from '@/api/productApi';

type useQueryProductOptions = Omit<UseQueryOptions<TPage<TProduct>>, 'queryKey' | 'queryFn'>;

export const useQueryProduct = (params: string, options?: useQueryProductOptions) => {
  const queryClient = useQueryClient();

  // Lấy danh sách Product
  const getAllProduct = useQuery({
    ...options,
    queryKey: [QueryKeys.PRODUCT, params],
    queryFn: () => productApi.getAllProduct(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Lấy danh sách Product Material
  const getAllProductMaterial = useQuery({
    ...options,
    queryKey: [QueryKeys.PRODUCT_MATERIAL, params],
    queryFn: () => productApi.getAllProductMaterial(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Tạo mới Product
  const createProduct = useMutation({
    mutationFn: (data: TCreateProduct) => productApi.createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCT] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCT_MATERIAL] });
      toast.success('Thêm sản phẩm mới thành công');
    },
    onError: () => {
      toast.error('Thêm sản phẩm thất bại');
    },
  });

  // Xóa Product
  const deleteProduct = useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCT] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCT_MATERIAL] });
      toast.success('Xóa sản phẩm thành công');
    },
    onError: () => {
      toast.error('Xóa sản phẩm thất bại');
    },
  });

  // Cập nhật Product
  const updateProduct = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TUpdateProduct }) =>
      productApi.updateProduct(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCT] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.PRODUCT_MATERIAL] });
      toast.success('Cập nhật thông tin sản phẩm thành công');
    },
    onError: () => {
      toast.error('Cập nhật thông tin sản phẩm thất bại');
    },
  });

  return { getAllProduct, getAllProductMaterial, createProduct, deleteProduct, updateProduct };
};
