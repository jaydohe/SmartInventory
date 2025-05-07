import { notificationApi } from '@/api/notificationApi';
import { QueryKeys } from '@/Constant';

import { TNotification, TPage, TResponse } from '@/interface';

import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type useGetNotificationQueryOptions = Omit<
  UseQueryOptions<TPage<TNotification>>,
  'queryKey' | 'queryFn'
>;

export const useGetNotification = (params: string, options?: useGetNotificationQueryOptions) => {
  const queryClient = useQueryClient();

  const getAllNotification = useQuery({
    ...options,
    queryKey: [QueryKeys.NOTIFY, params],
    queryFn: () => notificationApi.getAll(params),
    enabled: !!params,
    placeholderData: (previousData) => previousData,
    retry: 3,
    // staleTime: 1 * 60 * 1000, // 1 minutes
  });

  const markAsRead = useMutation({
    mutationFn: (data: string[]) => notificationApi.markAsRead(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.NOTIFY] });
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UNREAD_NOTIFICATION] });
      // toast.success(data.message);
    },
  });

  return { getAllNotification, markAsRead };
};
export const useGetUnReadCount = (params: string) => {
  return useQuery({
    queryKey: [QueryKeys.UNREAD_NOTIFICATION],
    queryFn: () => notificationApi.getUnReadCount(params),
    // placeholderData: (previousData) => previousData,
    retry: 3,
  });
};
