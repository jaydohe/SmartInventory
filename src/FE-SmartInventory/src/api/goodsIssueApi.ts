import { TPage, TResponse } from '@/interface';

import axiosClient from './AxiosClient';
import { TCreateGoodsIssue } from '@/interface/TGoodsIssuse';
import { TGoodsIssue, TUpdateGoodsIssueStatus } from '@/interface/TGoodsIssuse';

export const goodsIssueApi = {
  getAll: async (params: string): Promise<TPage<TGoodsIssue>> => {
    const url = `/api/v1/goods-issue/get-all?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getDetail: async (id: string, params: string): Promise<TResponse<TGoodsIssue>> => {
    const url = `/api/v1/goods-issue/get-by-id/${id}?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  createGoodsIssue: async (data: TCreateGoodsIssue) => {
    const url = 'api/v1/goods-issue/create';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  updateGoodsIssueStatus: async (code: string, data: TUpdateGoodsIssueStatus) => {
    const url = `/api/v1/goods-issue/update/${code}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deleteGoodsIssue: async (id: string) => {
    const url = `/api/v1/goods-issue/delete/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
