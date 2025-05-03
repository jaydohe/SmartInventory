export enum TicketStatusEnum {
  REJECTED = -1,
  NEW = 0,
  RECEVIED = 1,
  PROCESSED = 2,
}
export enum ProcessesStateEnum {
  PROCESSING = 0,
  PROCESSED = 1,
}

export const ProcessesState = [
  { name: 'Đang xử lý', id: ProcessesStateEnum.PROCESSING },
  { name: 'Đã xử lý', id: ProcessesStateEnum.PROCESSED },
];

export const TicketStatus = [
  { name: 'Từ chối', id: TicketStatusEnum.REJECTED },
  { name: 'Thêm mới', id: TicketStatusEnum.NEW },
  { name: 'Đang xử lý', id: TicketStatusEnum.RECEVIED },
  { name: 'Đã xử lý', id: TicketStatusEnum.PROCESSED },
];





export function genTicketEnum(status: number) {
  switch (status) {
    case TicketStatusEnum.REJECTED:
      return {
        Title: 'Từ chối',
        color: 'error',
      };

    case TicketStatusEnum.NEW:
      return {
        Title: 'Thêm mới',
        color: 'cyan',
      };
    case TicketStatusEnum.RECEVIED:
      return {
        Title: 'Đang xử lý',
        color: 'processing',
      };
    case TicketStatusEnum.PROCESSED:
      return {
        Title: 'Đã xử lý',
        color: 'success',
      };
    default:
      return {
        Title: '',
        color: 'gray',
      };
  }
}

export function genProcessesStateEnum(status: number) {
  switch (status) {
    case ProcessesStateEnum.PROCESSING:
      return {
        Title: 'Đang xử lý',
        color: 'processing',
      };

    case ProcessesStateEnum.PROCESSED:
      return {
        Title: 'Đã xử lý',
        color: 'success',
      };

    default:
      return {
        Title: '',
        color: 'gray',
      };
  }
}
