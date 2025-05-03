import { TicketStatusEnum } from '@/Constant/TicketEnumStatus';
import { TPage, TResponse } from '@/interface';
import {
  TAssignTicket,
  TCreateTicket,
  TProcessedTicket,
  TReportTicket,
  TRollBackTicket,
  TUpdateProcessTicket,
} from '@/interface/TReportTicket';
import axiosClient from './AxiosClient';

export const reportTicketApi = {
  getAllTicket: async (params: string): Promise<TPage<TReportTicket>> => {
    const url = `/api/v1/ticket?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  getTicketById: async (id: string, params: string): Promise<TResponse<TReportTicket>> => {
    const url = `/api/v1/ticket/${id}?${params}`;
    const res = await axiosClient.get(url);
    return res.data;
  },
  createTicket: async (data: TCreateTicket): Promise<TResponse<string>> => {
    const url = `/api/v1/ticket`;
    const res = await axiosClient.post(url, data);
    return res.data;
  },
  updateTicket: async (id: string, data: TCreateTicket): Promise<TResponse<string>> => {
    const url = `/api/v1/ticket/${id}`;
    const res = await axiosClient.put(url, data);
    return res.data;
  },

  deleteTicket: async (id: string): Promise<TResponse<string>> => {
    const url = `/api/v1/ticket/del/${id}`;
    const res = await axiosClient.delete(url);
    return res.data;
  },

  assignTicket: async (id: string, data: TAssignTicket): Promise<TResponse<string>> => {
    const url = `/api/v1/ticket/${id}/assign`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  rollBackTicket: async (id: string, data: string[]): Promise<TResponse<string>> => {
    const url = `/api/v1/ticket/${id}/unassign`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  ProcessedTicket: async (id: string, data: TProcessedTicket): Promise<TResponse<string>> => {
    const url = `/api/v1/ticket/${id}/state-processed`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  updateProcessTicket: async (
    processesId: string,
    data: TUpdateProcessTicket
  ): Promise<TResponse<string>> => {
    const url = `/api/v1/ticket/process/${processesId}`;
    const res = await axiosClient.patch(url, data);
    return res.data;
  },
  updateStatusTicket: async (
    id: string,
    TicketStatus: TicketStatusEnum
  ): Promise<TResponse<string>> => {
    const url = `/api/v1/ticket/${id}/update-status/${TicketStatus}`;
    const res = await axiosClient.patch(url);
    return res.data;
  },

  exportExcel: async (data: { from: string; to: string }) => {
    const url = `/api/v1/statistic/ticket?from=${data.from}&to=${data.to}`;

    // const url1 = 'http://192.168.1.4:5005/api/v1/25/export-incoming-bod-docs';
    const res = await axiosClient.get(url, {
      responseType: 'blob',
    });
    return res;
  },
};
