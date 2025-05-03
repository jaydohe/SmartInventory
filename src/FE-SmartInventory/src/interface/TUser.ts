import { RoleEnum, RoleEnumString } from '@/Constant';
import { TWarehouse } from './TWarehouse';

export type TUser = {
  id: string;
  employeeId: string | null;
  name: string;
  loginName: string;
  isLogin: boolean;
  role: RoleEnumString;
  warehouse: TWarehouse;
  createdAt:string;
  modifiedOn?:string;
};

export type TCreateUser = {
  name: string;
  loginName: string;
  password: string;
  userRole: RoleEnum;
};

export type TUpdatePassword = {
  password: string;
  rePassword: string;
};

export type TUpdateUser = Omit<TCreateUser, 'password' | 'userRole'>;
