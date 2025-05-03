import { RoleEnum } from '@/Constant';

export type TAccount = {
  id: string;
  fullName: string;
  userName: string;
  rankName: RoleEnum;
  isCanLogin: boolean;
  email: any;
  createdAt: string;
  modifiedOn: string;
  deletedOn: any;
};

export type TCreateAccount = {
  fullName: string;
  userName: string;
  rank: RoleEnum;
  password: string;
  email: string;
  agencyId: string;
};

export type TUpdateAccount = Omit<TCreateAccount, 'rank' | 'password'>;

export type TUpdatePassword = {
  password: string;
  rePassword: string;
};