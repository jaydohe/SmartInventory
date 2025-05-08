import { TPage } from "@/interface";
import axiosClient from "./AxiosClient";
import { TCreateProduct, TProduct, TUpdateProduct } from "@/interface/TProduct";

export const productApi = {
    getAll: async (params: string): Promise<TPage<TProduct>> => {
        const url = `/api/v1/product/get-all?${params}`;
        const res = await axiosClient.get(url);
        return res.data;
    },
    getDetail: async (id: string): Promise<TProduct> => {
        const url = `/api/v1/product/get-by-id/${id}`;
        const res = await axiosClient.get(url);
        return res.data;
    },
    createProduct: async (data: TCreateProduct) => {
        const url = "api/v1/product/create";
        const res = await axiosClient.post(url, data);
        return res.data;
    },
    updateProduct: async (id: string, data: TUpdateProduct) => {
        const url = `/api/v1/product/update/${id}`;
        const res = await axiosClient.patch(url, data);
        return res.data;
    },
    deleteProduct: async (id: string) => {
        const url = `/api/v1/product/delete/${id}`;
        const res = await axiosClient.delete(url);
        return res.data;
    }
};