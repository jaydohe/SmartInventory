import { RoleEnum } from '@/Constant';

export type TAccount = {
  id: string;
  employeeId: string;
  name: string;
  userName: string;
  rankName: RoleEnum;
  isCanLogin: boolean;
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
};

export type TCreateAccount = {
  employeeId: string;
  userName: string;
  rank: RoleEnum;
  password: string;
};

export type TUpdateAccount = Omit<TCreateAccount, 'rank' | 'password'>;

export type TUpdatePassword = {
  password: string;
  rePassword: string;
};