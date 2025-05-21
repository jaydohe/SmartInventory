import { TPage, TResponse } from '@/interface';
import {
  TMaterialSupplier,
  TMaterialSupplierCreate,
  TMaterialSupplierUpdate,
} from '@/interface/TMaterialSupplier';
import axiosClient from './AxiosClient';

export const MaterialSupplierApi = {
  getAllMaterialSupplier: async (params: string): Promise<TPage<TMaterialSupplier>> => {
    const url = `/api/v1/material-supplier/get-all?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetailMaterialSupplier: async (id: string): Promise<TResponse<TMaterialSupplier>> => {
    const url = `/api/v1/material-supplier/get-by-id/${id}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  createMaterialSupplier: async (data: TMaterialSupplierCreate) => {
    const url = 'api/v1/material-supplier/create';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  updateMaterialSupplier: async (id: string, data: TMaterialSupplierUpdate) => {
    const url = `/api/v1/material-supplier/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteMaterialSupplier: async (id: string) => {
    const url = `/api/v1/material-supplier/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
