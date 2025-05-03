import { deviceApi } from '@/api/deviceApi';
import { QueryKeys } from '@/Constant';
import { TPage } from '@/interface';
import { TCreateDevice, TDevice, TUpdateDevice } from '@/interface/TDevice';

import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// type useQueryDetailDeviceOptions = Omit<
//   UseQueryOptions<TResponse<TDetailDevice>>,
//   'queryKey' | 'queryFn'
// >;
type useQueryDeviceOptions = Omit<UseQueryOptions<TPage<TDevice>>, 'queryKey' | 'queryFn'>;

export const useQueryDevice = (params: string, options?: useQueryDeviceOptions) => {
  const queryClient = useQueryClient();
  const getAllDevice = useQuery({
    ...options,
    queryKey: [QueryKeys.ALL_DEVICE, params],
    queryFn: () => deviceApi.getAllDevice(params),
    enabled: !!params,

    placeholderData: (previousData) => previousData,
    retry: 3,
  });

  const createDevice = useMutation({
    mutationFn: (data: TCreateDevice) => deviceApi.createDevice(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE, params] });
      toast.success('Thêm thiết bị thành công');
    },
  });
  const updateDevice = useMutation({
    mutationFn: (data: TUpdateDevice) => deviceApi.updateDevice(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE, params] });
      toast.success('Cập nhật thiết bị thành công');
    },
  });
  const deleteDevice = useMutation({
    mutationFn: (id: string) => deviceApi.deleteDevice(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE, params] });
      toast.success('Xoá thiết bị thành công');
    },
  });
  return { getAllDevice, createDevice, updateDevice, deleteDevice };
};

// export const useQueryDetailDevice = (
//   deviceCode: string,
//   params: string,
//   options?: useQueryDetailDeviceOptions
// ) => {
//   const queryClient = useQueryClient();
//   const getDetailDevice = useQuery({
//     ...options,
//     queryKey: [QueryKeys.DEVICE_CODE, deviceCode],
//     queryFn: () => deviceListApi.getDetailDevice(deviceCode, params),
//     enabled: !!deviceCode,
//     staleTime: 1 * 60 * 1000,
//     placeholderData: (previousData) => previousData,
//     retry: 3,
//   });

//   const assignDevice = useMutation({
//     mutationFn: (data: Pick<TDetailDevice, 'code' | 'agencyId'>) =>
//       deviceListApi.assignDevice(data.code, data.agencyId),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE] });
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.DEVICE_CODE, deviceCode] });
//       toast.success('Gán thiết bị thành công');
//     },
//   });

//   const unassignDevice = useMutation({
//     mutationFn: (devCode: string) => deviceListApi.unassignDevice(devCode),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE] });
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.DEVICE_CODE, deviceCode] });
//       toast.success('Gỡ gán thiết bị thành công');
//     },
//   });

//   const deleteDevice = useMutation({
//     mutationFn: (devCode: string) => deviceListApi.deleteDevice(devCode),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE] });
//       toast.success('Xoá thiết bị thành công');
//     },
//   });

//   const deleteSessionWeight = useMutation({
//     mutationFn: (devCode: string) => deviceListApi.deleteSessionWeight(devCode),
//     onSuccess: (data) => {
//       // queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE] });
//       // queryClient.invalidateQueries({ queryKey: [QueryKeys.DEVICE_CODE, deviceCode] });
//       toast.success('Xoá dữ liệu cân thành công');
//     },
//   });

//   const restoreDeviceWeight = useMutation({
//     mutationFn: (devCode: string) => deviceListApi.restoreDeviceWeight(devCode),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE] });
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.DEVICE_CODE, deviceCode] });
//       toast.success('Khôi phục thiết bị thành công');
//     },
//   });

//   const updateDevice = useMutation({
//     mutationFn: ({ devCode, data }: { devCode: string; data: TUpdateDevice }) =>
//       deviceListApi.updateDevice(devCode, data),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE] });
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.DEVICE_CODE, deviceCode] });
//       toast.success('Cập nhật thiết bị thành công');
//     },
//   });
//   const deleteSessionWeightDay = useMutation({
//     mutationFn: (data: TExportSummary) => deviceListApi.deleteSessionWeightDay(data),
//     onSuccess: (data) => {
//       // queryClient.invalidateQueries({ queryKey: [QueryKeys.ALL_DEVICE] });
//       queryClient.invalidateQueries({ queryKey: [QueryKeys.DEVICE_CODE, deviceCode] });
//       toast.success('Xoá dữ liệu cân thành công');
//     },
//   });

//   return {
//     deleteSessionWeightDay,
//     getDetailDevice,
//     assignDevice,
//     unassignDevice,
//     deleteDevice,
//     deleteSessionWeight,
//     updateDevice,
//     restoreDeviceWeight,
//   };
// };
