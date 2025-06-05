import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { getSetupApi } from '@/api/getSetupApi';
import { TCreateSetup, TGetSetup } from '@/interface/TGetSetup';
import { QueryKeys } from '@/Constant';

export const useQuerySetup = (params: string) => {
  const queryClient = useQueryClient();

  const getSetup = useQuery({
    queryKey: [QueryKeys.SETUP, params],
    queryFn: () => getSetupApi.getSetup(params),
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const createOrUpdateSetup = useMutation({
    mutationFn: (data: TCreateSetup) => getSetupApi.createSetup(data),
    onSuccess: () => {
      message.success('Cập nhật thông số thành công!');
      queryClient.invalidateQueries({ queryKey: [QueryKeys.SETUP] });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || 'Cập nhật thông số thất bại!');
    },
  });

  return {
    getSetup,
    createOrUpdateSetup,
  };
};
