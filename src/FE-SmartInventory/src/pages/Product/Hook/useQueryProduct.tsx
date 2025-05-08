import { TPage, TResponse } from '@/interface';
import { QueryKeys } from '@/Constant';
import { TProduct, TCreateProduct, TUpdateProduct } from '@/interface/TProduct';
import { useQueryClient, UseQueryOptions, useQuery, useMutation } from '@tanstack/react-query';
import { productApi } from '@/api/productApi';

export const useQueryProduct = (params: string) => {
  const queryClient = useQueryClient();

  const getAllProducts = useQuery({
    queryKey: [QueryKeys.GET_ALL_PRODUCT, params],
    queryFn: () => productApi.getAll(params),
    enabled: !!params,
  });

  const getDetailProduct = (id: string) =>
    useQuery({
      queryKey: [QueryKeys.DETAIL_PRODUCT, id],
      queryFn: () => productApi.getDetail(id),
      enabled: !!id,
    });

  const createProduct = useMutation({
    mutationFn: (data: TCreateProduct) => productApi.createProduct(data),
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.GET_ALL_PRODUCT]),
  });

  const updateProduct = useMutation({
    mutationFn: (id: string, data: TUpdateProduct) => productApi.updateProduct(id, data),
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.GET_ALL_PRODUCT]),
  });

  const deleteProduct = useMutation({
    mutationFn: (id: string) => productApi.deleteProduct(id),
    onSuccess: () => queryClient.invalidateQueries([QueryKeys.GET_ALL_PRODUCT]),
  });

  return { getAllProducts, getDetailProduct, createProduct, updateProduct, deleteProduct };
};