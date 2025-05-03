import { QueryKeys } from '@/Constant';
import { TPage, TResponse } from '@/interface';

import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { TActivity } from '@/interface/TActivity';
import { activityApi } from '@/api/activityApi';

type useQueryAllReportTicketOptions = Omit<
  UseQueryOptions<TPage<TActivity>>,
  'queryKey' | 'queryFn'
>;

export const useQueryActivity = (params: string, options?: useQueryAllReportTicketOptions) => {
  const queryClient = useQueryClient();
  const getAll = useQuery({
    ...options,
    queryKey: [QueryKeys.ACTIVITY, params],
    queryFn: () => activityApi.getAll(params),
    staleTime: 1 * 60 * 1000,
    enabled: !!params,
    placeholderData: (previousData) => previousData,
    retry: 3,
  });

  return { getAll };
};