import { TPage, TResponse } from '@/interface';
import { TDepartment, TCreateDepartment } from '@/interface/TDepartment';
import axiosClient from './AxiosClient';
import { TCreateSetup, TGetSetup } from '@/interface/TGetSetup';
import { TDemandByPeriod, TInventoryOptimize } from '@/interface/TSmartDashboard';

export const smartDashboardApi = {
  // getAllDemand: Xem danh sách dự báo nhu cầu (DEV, Admin, Warehouse_Staff(quản lý) có thể truy cập )
  getAllDemand: async (): Promise<TPage<TDemandByPeriod>> => {
    const url = `/api/v1/smart/get-all-demand`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  //TDemandByPeriod: Xem danh sách dự báo nhu cầu theo kỳ và kho
  //DEV, Admin, Warehouse_Staff(quản lý) có thể truy cập
  // /api/v1/smart/get-demand-by-period/{warehouseid}/{from}/{to}
  //định dạng của from và to là "YYYY-MM"
  getDemandByPeriod: async (id: string, from: string, to: string): Promise<TDemandByPeriod[]> => {
    const url = `/api/v1/smart/get-demand-by-period/${id}/${from}/${to}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  //TInventoryOptimize: Xem danh sách tối ưu toàn bộ tồn kho theo kho (DEV, Admin, Warehouse_Staff(quản lý) có thể truy cập)
  // /api/v1/smart/get-all-optimize
  // dùng chung type TInventoryOptimize
  getInventoryOptimize: async (): Promise<TPage<TInventoryOptimize>> => {
    const url = `/api/v1/smart/get-all-optimize`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  //getInventoryOptimizeByWarehouse: Xem danh sách tối ưu tồn kho (DEV, Admin, Warehouse_Staff(quản lý) có thể truy cập)
  // /api/v1/smart/get-optimize-by-ware/{warehouseid}
  getInventoryOptimizeByWarehouse: async (id: string): Promise<TInventoryOptimize[]> => {
    const url = `/api/v1/smart/get-optimize-by-ware/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
};
