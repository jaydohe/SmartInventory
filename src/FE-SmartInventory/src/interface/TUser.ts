import { RoleEnum, RoleEnumString } from '@/Constant';
import { TUnit } from './TUnit';

export type TUser = {
  id: string;
  name: string;
  loginName: string;
  isLogin: boolean;
  unitId: string;
  role: RoleEnumString;
  unit: TUnit;
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
