import { TPage, TResponse } from '@/interface';
import { QueryKeys, RoleEnum, RoleEnumString } from '@/Constant';
import { TProduct, TCreateProduct, TUpdateProduct } from '@/interface/TProduct';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { productApi } from '@/api/productApi';
import { toast } from 'react-toastify';
import CreateProduct from '../Components/CreateProduct';


type useQueryProductOptions = Omit<UseQueryOptions<TPage<TProduct>>, 'queryKey' | 'queryFn'>;

type useQueryDetailProductOptions = Omit<UseQueryOptions<TResponse<TProduct>>, 'queryKey' | 'queryFn'>;

export const useQueryProduct = (params: string, options?: useQueryProductOptions) => {
  const queryClient = useQueryClient();
  const getAllProduct = useQuery({
    ...options,
    queryKey: [QueryKeys.GET_ALL_USER, params],
    queryFn: () => productApi.getAll(params),
    enabled: !!params,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });
  const createProduct = useMutation({
      mutationFn: (data: TCreateProduct) => productApi.createProduct(data),
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_PRODUCT, params] });
        toast.success('Thêm sản phẩm thành công');
      },
    });

    const deleteProduct = useMutation({
        mutationFn: (id: string) => productApi.deleteProduct(id),
        onSuccess: (_) => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_PRODUCT] });
          toast.success('Xóa sản phẩm thành công');
        },
    });

    const updateProduct = useMutation({
        mutationFn: ({ id, data }: { id: string; data: TUpdateProduct }) =>
          productApi.updateProduct(id, data),
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.GET_ALL_PRODUCT] });
          toast.success('Cập nhật thông tin sản phẩm');
        },
      });
      return { getAllProduct, createProduct, deleteProduct, updateProduct };
};

export const useQueryDetailProduct = (id: string, options?: useQueryDetailProductOptions) => {
  return useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_PRODUCT, id],
    queryFn: () => productApi.getDetail(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000,
    placeholderData: (prevData) => prevData,
    retry: 3,
  });
};