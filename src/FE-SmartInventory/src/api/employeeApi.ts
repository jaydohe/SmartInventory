import { TPage, TResponse } from "@/interface";
import { TEmployee, TCreateEmployee, TUpdateEmployee } from "@/interface/TEmployee";
import axiosClient from "./AxiosClient";

export const employeeApi = {
    getAll: async (params: string): Promise<TPage<TEmployee>> => {
        const url = `/api/v1/employee/get-all?${params}`;
        const res = await axiosClient.get(url);
        return res.data;
    },
    getDetail: async (id: string): Promise<TResponse<TEmployee>> => {
        const url = `/api/v1/employee/get-by-id/${id}`;
        const res = await axiosClient.get(url);
        return res.data;
    },
    createEmployee: async (data: TCreateEmployee) => {
        const url = 'api/v1/employee/create';
        const res = await axiosClient.post(url, data);
        return res.data;
    },
    updateEmployee: async (id: string, data: TUpdateEmployee) => {
        const url = `/api/v1/employee/update/${id}`;
        const res = await axiosClient.patch(url, data);
        return res.data;
    },
    deleteEmployee: async (id: string) => {
        const url = `/api/v1/employee/delete/${id}`;
        const res = await axiosClient.delete(url);
        return res.data;
    }
};