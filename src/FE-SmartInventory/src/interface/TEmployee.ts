import { GenderTypes } from '@/Constant/EmployeeTypes';
import { TDepartment } from './TDepartment';
import { TPosition } from './TPosition';
import { TWarehouse } from './TWarehouse';

export type TEmployee = {
  departmentId: string;
  wardId: string;
  districtId: string;
  provinceId: string;
  warehouseId: string;
  positionId: string;
  code: string;
  name: string;
  genderType: GenderTypes;
  isManager: boolean;
  phoneNumber: string;
  email: string;
  address: string;
  dateHired: string;
  createdAt: string;
  modifiedOn: any;
  deletedOn: any;
  id: string;
  department: TDepartment;
  position: TPosition;
  warehouse: TWarehouse;
};

export type TCreateEmployee = {
  positionId: string;
  departmentId: string;
  warehouseId?: string;
  code: string;
  name: string;
  gender: GenderTypes;
  isManager: boolean;
  phoneNumber: string;
  email: string;
  address: string;
  dateHired: string;
};

export type TUpdateEmployee = Omit<TCreateEmployee, 'code' | 'dateHired'>;
