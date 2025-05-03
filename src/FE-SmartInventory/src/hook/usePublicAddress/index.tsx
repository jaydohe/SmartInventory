import { QueryKeys } from '@/Constant';
import { publicAddressApi } from '@/api';

import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetAllCities = (params: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_ALL_CITIES, params],
    queryFn: () => publicAddressApi.getAllCities(params),
    // placeholderData: (previousData) => previousData,
    staleTime: 180 * 60 * 1000, // 180 minuets
    enabled: !!params,
    retry: 3,
  });
};

export const useGetAllDistricts = (params: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_ALL_DISTRICTS, params],
    queryFn: () => publicAddressApi.getAllDistricts(params),
    enabled: !!params,
    placeholderData: (previousData) => previousData,
    staleTime: 180 * 60 * 1000, // 180 minuets
    retry: 3,
  });
};

export const useGetAllWards = (params: string) => {
  return useQuery({
    queryKey: [QueryKeys.GET_ALL_WARDS, params],
    queryFn: () => publicAddressApi.getAllWards(params),
    enabled: !!params,
    placeholderData: (previousData) => previousData,
    staleTime: 180 * 60 * 1000, // 180 minuets
    retry: 3,
  });
};
