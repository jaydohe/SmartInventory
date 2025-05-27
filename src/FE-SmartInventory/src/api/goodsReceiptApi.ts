import { TPage, TResponse } from '@/interface';

import axiosClient from './AxiosClient';

import {
  TGoodsReceipt,
  TGoodsReceiptCreateMaterial,
  TGoodsReceiptCreateOrder,
  TGoodsReceiptCreateProductionCommand,
  TGoodsReceiptUpdate,
} from '@/interface/TGoodsReceipt';

export const GoodsReceiptApi = {
  getAll: async (params: string): Promise<TPage<TGoodsReceipt>> => {
    const url = `/api/v1/goods-receipt/get-all?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetail: async (id: string, params: string): Promise<TResponse<TGoodsReceipt>> => {
    const url = `/api/v1/goods-receipt/get-by-id/${id}?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  //Thêm phiếu nhập hàng từ nhà cung cấp NVL
  createGoodsReceiptByMaterial: async (data: TGoodsReceiptCreateMaterial) => {
    const url = '/api/v1/goods-receipt/create-material';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  //Thêm phiếu nhập hàng từ đơn hàng
  createGoodsReceiptByOrder: async (data: TGoodsReceiptCreateOrder) => {
    const url = '/api/v1/goods-receipt/create-order';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  //Thêm phiếu nhập hàng từ lệnh sản xuất
  createGoodsReceiptByProductionCommand: async (data: TGoodsReceiptCreateProductionCommand) => {
    const url = '/api/v1/goods-receipt/create-production';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  //Cập nhật phiếu nhập hàng
  updateGoodsReceiptStatus: async (id: string, data: TGoodsReceiptUpdate) => {
    const url = `/api/v1/goods-receipt/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteGoodsReceipt: async (id: string) => {
    const url = `/api/v1/goods-receipt/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
