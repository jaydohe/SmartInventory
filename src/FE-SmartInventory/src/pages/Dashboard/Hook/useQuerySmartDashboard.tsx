import { QueryKeys } from '@/Constant';
import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { smartDashboardApi } from '@/api/smartDashboardApi';
import { TDemandByPeriod, TInventoryOptimize } from '@/interface/TSmartDashboard';
import { TPage } from '@/interface';

type useQueryAllDemandOptions = Omit<
  UseQueryOptions<TPage<TDemandByPeriod>>,
  'queryKey' | 'queryFn'
>;
type useQueryDemandByPeriodOptions = Omit<
  UseQueryOptions<TDemandByPeriod[]>,
  'queryKey' | 'queryFn'
>;
type useQueryInventoryOptimizeOptions = Omit<
  UseQueryOptions<TPage<TInventoryOptimize>>,
  'queryKey' | 'queryFn'
>;
type useQueryInventoryOptimizeByWarehouseOptions = Omit<
  UseQueryOptions<TInventoryOptimize[]>,
  'queryKey' | 'queryFn'
>;
export const useQuerySmartDashboard = () => {
  // Lấy danh sách tất cả dự báo nhu cầu
  const getAllDemand = (params?: string, options?: useQueryAllDemandOptions) => {
    return useQuery({
      ...options,
      queryKey: [QueryKeys.SMART_DASHBOARD, 'getAllDemand'],
      queryFn: () => smartDashboardApi.getAllDemand(),
      staleTime: 5 * 60 * 1000,

      placeholderData: (previousData) => previousData,
      retry: 3,
    });
  };

  // Lấy dự báo nhu cầu theo kỳ và kho
  const getDemandByPeriod = (
    id: string,
    from: string,
    to: string,
    options?: useQueryDemandByPeriodOptions
  ) => {
    return useQuery({
      ...options,
      queryKey: [QueryKeys.SMART_DASHBOARD, 'getDemandByPeriod', id, from, to],
      queryFn: () => smartDashboardApi.getDemandByPeriod(id, from, to),
      staleTime: 5 * 60 * 1000,
      enabled: !!id && !!from && !!to,
      placeholderData: (previousData) => previousData,
      retry: 3,
    });
  };

  // Lấy danh sách tối ưu toàn bộ tồn kho
  const getInventoryOptimize = (options?: useQueryInventoryOptimizeOptions) => {
    return useQuery({
      ...options,
      queryKey: [QueryKeys.SMART_DASHBOARD, 'getInventoryOptimize'],
      queryFn: () => smartDashboardApi.getInventoryOptimize(),
      staleTime: 5 * 60 * 1000,
      placeholderData: (previousData) => previousData,
      retry: 3,
    });
  };

  // Lấy danh sách tối ưu tồn kho theo kho
  const getInventoryOptimizeByWarehouse = (
    id: string,
    options?: useQueryInventoryOptimizeByWarehouseOptions
  ) => {
    return useQuery({
      ...options,
      queryKey: [QueryKeys.SMART_DASHBOARD, 'getInventoryOptimizeByWarehouse', id],
      queryFn: () => smartDashboardApi.getInventoryOptimizeByWarehouse(id),
      staleTime: 5 * 60 * 1000,
      enabled: !!id,
      placeholderData: (previousData) => previousData,
      retry: 3,
    });
  };

  return {
    getAllDemand,
    getDemandByPeriod,
    getInventoryOptimize,
    getInventoryOptimizeByWarehouse,
  };
};
