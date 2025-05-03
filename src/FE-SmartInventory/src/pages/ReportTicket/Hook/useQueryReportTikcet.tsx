import { deviceTypeApi } from '@/api/deviceTypeApi';
import { reportTicketApi } from '@/api/reportTicketApi';
import { QueryKeys } from '@/Constant';
import { TicketStatusEnum } from '@/Constant/TicketEnumStatus';
import { TPage, TResponse } from '@/interface';
import { TCreateDeviceType, TDeviceType } from '@/interface/TDeviceType';
import {
  TAssignTicket,
  TCreateTicket,
  TProcessedTicket,
  TReportTicket,
  TRollBackTicket,
  TUpdateProcessTicket,
} from '@/interface/TReportTicket';

import { UseQueryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

type useQueryDetailReportTicketOptions = Omit<
  UseQueryOptions<TResponse<TReportTicket>>,
  'queryKey' | 'queryFn'
>;
type useQueryAllReportTicketOptions = Omit<
  UseQueryOptions<TPage<TReportTicket>>,
  'queryKey' | 'queryFn'
>;

export const useQueryReportTicket = (params: string, options?: useQueryAllReportTicketOptions) => {
  const queryClient = useQueryClient();
  const getAllTicket = useQuery({
    ...options,
    queryKey: [QueryKeys.REPORT_TICKET, params],
    queryFn: () => reportTicketApi.getAllTicket(params),
    // staleTime: 1 * 60 * 1000,
    enabled: !!params,
    placeholderData: (previousData) => previousData,
    retry: 3,
  });

  const createTicket = useMutation({
    mutationFn: (data: TCreateTicket) => reportTicketApi.createTicket(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.REPORT_TICKET, params] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ALL_DEVICE],
      });
      toast.success('Thêm báo cáo sự cố thành công');
    },
  });
  const updateTicket = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TCreateTicket }) =>
      reportTicketApi.updateTicket(id, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.REPORT_TICKET, params] });

      toast.success('Cập nhật báo cáo sự cố thành công');
    },
  });

  const exportExcelTicket = useMutation({
    mutationFn: (data: { from: string; to: string }) => {
      return reportTicketApi.exportExcel(data);
    },
    onSuccess: (data) => {
      // toast.success(data.message);
    },
  });

  const deleteTicket = useMutation({
    mutationFn: (id: string) => reportTicketApi.deleteTicket(id),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.REPORT_TICKET, params] });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ALL_DEVICE],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ACTIVITY],
      });
      toast.success('Xoá báo cáo sự cố thành công');
    },
  });

  return { getAllTicket, createTicket, updateTicket, exportExcelTicket, deleteTicket };
};

export const useQueryDetailReportTicket = (
  ticketId: string,
  params: string,
  options?: useQueryDetailReportTicketOptions
) => {
  const queryClient = useQueryClient();
  const getTicketById = useQuery({
    ...options,
    queryKey: [QueryKeys.DETAIL_REPORT_TICKET, ticketId],
    queryFn: () => reportTicketApi.getTicketById(ticketId, params),
    enabled: !!ticketId,
    // staleTime: 1 * 60 * 1000,
    placeholderData: (previousData) => previousData,
    retry: 3,
  });

  const assignTicket = useMutation({
    mutationFn: (data: TAssignTicket) => reportTicketApi.assignTicket(ticketId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DETAIL_REPORT_TICKET, ticketId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.REPORT_TICKET],
      });
      toast.success('Phân công thực hiện thành công');
    },
  });

  const rollBackTicket = useMutation({
    mutationFn: (data: string[]) => reportTicketApi.rollBackTicket(ticketId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DETAIL_REPORT_TICKET, ticketId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.REPORT_TICKET],
      });
      toast.success('Thu hồi phân công thực hiện thành công');
    },
  });

  const ProcessedTicket = useMutation({
    mutationFn: (data: TProcessedTicket) => reportTicketApi.ProcessedTicket(ticketId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DETAIL_REPORT_TICKET, ticketId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.REPORT_TICKET],
      });
      toast.success('Xác nhận hoàn thành thành công');
    },
  });
  const updateProcessTicket = useMutation({
    mutationFn: ({ processesId, data }: { processesId: string; data: TUpdateProcessTicket }) =>
      reportTicketApi.updateProcessTicket(processesId, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DETAIL_REPORT_TICKET, ticketId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.REPORT_TICKET],
      });
      toast.success('Cập nhật thành công');
    },
  });
  const updateStatusTicket = useMutation({
    mutationFn: (TicketStatus: TicketStatusEnum) =>
      reportTicketApi.updateStatusTicket(ticketId, TicketStatus),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.DETAIL_REPORT_TICKET, ticketId],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.ALL_DEVICE],
      });
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.REPORT_TICKET],
      });
      toast.success('Cập nhật trạng thái thành công');
    },
  });
  return {
    getTicketById,
    assignTicket,
    rollBackTicket,
    ProcessedTicket,
    updateProcessTicket,
    updateStatusTicket,
  };
};
