import { TAgency, TCreateAgency, TUpdateAgency } from '@/interface/TAgency';
import axiosClient from './AxiosClient';
import { TPage } from '@/interface';

export const agencyListApiApi = {
    getAll: async (params: string): Promise<TPage<TAgency>> => {
        const url = `/api/v1/agency/get-all?${params}`;
        const res = await axiosClient.get(url);
        return res.data;
    },
    getDetail: async (id: string): Promise<TAgency> => {
        const url = `/api/v1/agency/get-by-id/${id}`;
        const res = await axiosClient.get(url);
        return res.data;
    },
    createAgency: async (data: TCreateAgency) => {
        const url = 'api/v1/agency/create';
        const res = await axiosClient.post(url, data);
        return res.data;
    },
    updateAgency: async (id: string, data: TUpdateAgency) => {
        const url = `/api/v1/agency/update/${id}`;
        const res = await axiosClient.patch(url, data);
        return res.data;
    },
    deleteAgency: async (id: string) => {
        const url = `/api/v1/agency/delete/${id}`;
        const res = await axiosClient.delete(url);
        return res.data;
    }
};