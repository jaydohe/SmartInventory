import { TPage, TResponse } from '@/interface';
import { TPosition, TCreatePosition } from '@/interface/TPosition';
import axiosClient from './AxiosClient';

export const positionApi = {
  getAllPosition: async (params: string): Promise<TPage<TPosition>> => {
    const url = `/api/v1/position?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },

  createPosition: async (data: TCreatePosition) => {
    const url = 'api/v1/position/create';
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  updatePosition: async (id: string, data: TCreatePosition) => {
    const url = `/api/v1/position/update/${id}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  deletePosition: async (id: string) => {
    const url = `/api/v1/Position/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },
};
