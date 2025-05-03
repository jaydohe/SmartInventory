import { deviceApi } from '@/api/deviceApi';
import { deviceTypeApi } from '@/api/deviceTypeApi';
import { QueryKeys } from '@/Constant';
import { TPage, TResponse } from '@/interface';
import { TCreateDevice, TDevice } from '@/interface/TDevice';
import { TCreateDeviceType, TDeviceType } from '@/interface/TDeviceType';

import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type useQueryDetailDeviceTypeOptions = Omit<
  UseQueryOptions<TResponse<TDeviceType>>,
  'queryKey' | 'queryFn'
>;
type useQueryDeviceTypeOptions = Omit<UseQueryOptions<TPage<TDeviceType>>, 'queryKey' | 'queryFn'>;

export const useQueryDeviceType = (params: string, options?: useQueryDeviceTypeOptions) => {
  const queryClient = useQueryClient();
  const getAllDeviceType = useQuery({
    ...options,
    queryKey: [QueryKeys.ALL_DEVICE_TYPE, params],
    queryFn: () => deviceTypeApi.getAllDeviceType(params),
    staleTime: 1 * 60 * 1000,
    enabled: !!params,
    placeholderData: (previousData) => previousData,
    retry: 3,
  });

  const createDeviceType = useMutation({
    mutationFn: (data: TCreateDeviceType) => deviceTypeApi.createDeviceType(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE_TYPE, params] });
      toast.success('Thêm loại thiết bị thành công');
    },
  });
  const updateDeviceType = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TCreateDeviceType }) =>
      deviceTypeApi.updateDeviceType(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE_TYPE, params] });
      toast.success('Cập nhật loại thiết bị thành công');
    },
  });
  const deleteDeviceType = useMutation({
    mutationFn: (id: string) => deviceTypeApi.deleteDeviceType(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE_TYPE, params] });
      toast.success('Xoá loại thiết bị thành công');
    },
  });

  return { getAllDeviceType, createDeviceType, updateDeviceType, deleteDeviceType };
};

export const useQueryDetailDevice = (
  deviceId: string,
  params?: string,
  options?: useQueryDetailDeviceTypeOptions
) => {
  const queryClient = useQueryClient();
  const getDetailDeviceType = useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_DEVICE_TYPE, deviceId],
    queryFn: () => deviceTypeApi.getDetailDeviceType(deviceId),
    enabled: !!deviceId,
    staleTime: 1 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    retry: 3,
  });

  return {
    getDetailDeviceType,
  };
};
