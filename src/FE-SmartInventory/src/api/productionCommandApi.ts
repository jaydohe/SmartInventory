import { TPage, TResponse } from '@/interface';
import axiosClient from './AxiosClient';
import { TCreateProduct, TProduct, TUpdateProduct } from '@/interface/TProduct';
import {
  TProductionCommand,
  TProductionCommandCreate,
  TProductionCommandProcessUpdate,
  TProductionCommandRequest,
  TProductionCommandUpdate,
} from '@/interface/TProductionCommand';

export const productionCommandApi = {
  getAllProductionCommand: async (params: string): Promise<TPage<TProductionCommand>> => {
    const url = `/api/v1/production-command/get-all?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetail: async (id: string, params: string): Promise<TResponse<TProductionCommand>> => {
    const url = `/api/v1/production-command/get-by-id/${id}?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  //Thêm lệnh sản xuất
  createProductionCommand: async (data: TProductionCommandCreate) => {
    const url = 'api/v1/production-command/create';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  //Yêu cầu lệnh sản xuất
  createProductionCommandRequest: async (data: TProductionCommandRequest) => {
    const url = 'api/v1/production-command/create-request';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  //Cập nhật tiến độ lệnh sản xuất
  updateProductionCommandStatus: async (id: string, data: TProductionCommandUpdate) => {
    const url = `/api/v1/production-command/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },

  //Cập nhật trạng thái lệnh sản xuất
  updateProductionCommandProcess: async (id: string, data: TProductionCommandProcessUpdate) => {
    const url = `/api/v1/production-command/update-status/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteProductionCommand: async (id: string) => {
    const url = `/api/v1/production-command/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
