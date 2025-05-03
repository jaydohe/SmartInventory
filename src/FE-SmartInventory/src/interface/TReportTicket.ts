import { RoleEnum } from '@/Constant';
import { TDevice } from './TDevice';
import { ProcessesStateEnum } from '@/Constant/TicketEnumStatus';

export type TReportTicket = {
  userId: string;
  deviceId: string;
  imagePath: string;
  filePath: string;
  name: string;
  description: string;
  status: number;
  createdAt: string;
  modifiedOn: any;
  id: string;
  user: User;
  device: TDevice;
  processes: TTicketProcesses[];
};

export interface User {
  refId: any;
  name: string;
  loginName: string;
  hashPassword: string;
  isLogin: boolean;
  unitId: string;
  status: number;
  role: RoleEnum;
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
  id: string;
}

export type TTicketProcesses = {
  ticketId: string;
  userSenderId: string;
  userReceivedId: string;
  message: string;
  state: ProcessesStateEnum;
  expireAt: string;
  imagePath: any;
  createdAt: string;
  modifiedOn: string;
  id: string;
  userSender: TUserSender;
  userReceived: TUserReceived;
};

export type TUserSender = {
  refId: any;
  name: string;
  loginName: string;
  hashPassword: string;
  isLogin: boolean;
  unitId: string;
  status: number;
  role: RoleEnum;
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
  id: string;
};

export type TUserReceived = {
  refId: any;
  name: string;
  loginName: string;
  hashPassword: string;
  isLogin: boolean;
  unitId: string;
  status: number;
  role: RoleEnum;
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
  id: string;
};

export type TCreateTicket = {
  name: string;
  deviceCode: string;
  imagePath?: string;
  filePath?: string;
  description: string;
};

export type TAssignTicket = {
  userId: string[];
  message: string;
  expireAt: string;
};

export type TRollBackTicket = Pick<TAssignTicket, 'userId'>;
export type TProcessedTicket = Pick<TCreateTicket, 'imagePath'>;
export type TUpdateProcessTicket = Omit<TAssignTicket, 'userId'> & { state: ProcessesStateEnum };

export enum ModalTypeProcessEnum {
  rollBack,
  assignTicket,
  updateStatusTicket,
  updateProcess,
  updateProcessed,
}
