export interface RoleObject {
  id: number;
  name: RoleEnumString;
}
export type RoleHierarchy = {
  [key in RoleEnum]: RoleEnum[];
};

export const DEV = 'DEV';
export const ADMIN = 'ADMIN';
export const WAREHOUSE_STAFF = 'WAREHOUSE_STAFF';
export const WAREHOUSE_PRODUCER = 'WAREHOUSE_PRODUCER';
export const SALESMAN = 'SALESMAN';

export enum RoleEnumString {
  DEV = 'DEV',
  ADMIN = 'ADMIN',
  WAREHOUSE_STAFF = 'WAREHOUSE_STAFF', // nhân viên kho
  WAREHOUSE_PRODUCER = 'WAREHOUSE_PRODUCER', // nhân viên sản xuất
  SALESMAN = 'SALESMAN' // nhân viên bán hàng
};

export const USER_ROLES: RoleEnumString[] = [
  RoleEnumString.WAREHOUSE_STAFF  ,
  RoleEnumString.WAREHOUSE_PRODUCER,
  RoleEnumString.SALESMAN
];

export enum RoleEnum {
  DEV = 0,
  ADMIN = 1,
  WAREHOUSE_STAFF = 2,
  WAREHOUSE_PRODUCER = 3,
  SALESMAN = 4
}

export enum AccountOptionEnum {
  CHANGE_PASSWORD = 'ChangPassWord',
  CHANGE_ROLE = 'ChangeRole',
  UPDATE_ACCOUNT = 'UpdateAccount',
}

export const ROLE: RoleObject[] = [
  { id: 0, name: RoleEnumString.DEV },
  { id: 1, name: RoleEnumString.ADMIN },
  { id: 2, name: RoleEnumString.WAREHOUSE_STAFF },
  { id: 3, name: RoleEnumString.WAREHOUSE_PRODUCER },
  { id: 4, name: RoleEnumString.SALESMAN }
];

// Define role hierarchy mapping
export const ROLE_HIERARCHY: { [key: string]: string[] } = {
  DEV: ['ADMIN', 'WAREHOUSE_STAFF', 'WAREHOUSE_PRODUCER', 'SALESMAN'],
  ADMIN: ['WAREHOUSE_STAFF', 'WAREHOUSE_PRODUCER', 'SALESMAN'],
};

export const roleName = {
  [RoleEnumString.DEV]: 'Dev',
  [RoleEnumString.ADMIN]: 'Admin',
  [RoleEnumString.WAREHOUSE_STAFF]: 'Nhân viên kho',
  [RoleEnumString.WAREHOUSE_PRODUCER]: 'Nhân viên sản xuất',
  [RoleEnumString.SALESMAN]: 'Nhân viên bán hàng'
};

export const roleNumToStr = {
  [RoleEnum.DEV]: RoleEnumString.DEV,
  [RoleEnum.ADMIN]: RoleEnumString.ADMIN,
  [RoleEnum.WAREHOUSE_STAFF]: RoleEnumString.WAREHOUSE_STAFF,
  [RoleEnum.WAREHOUSE_PRODUCER]: RoleEnumString.WAREHOUSE_PRODUCER,
  [RoleEnum.SALESMAN]: RoleEnumString.SALESMAN
};

export enum UserOptionEnum {
  CHANGE_PASSWORD = 'ChangPassWord',
  CHANGE_ROLE = 'ChangeRole',
  UPDATE_ACCOUNT = 'UpdateAccount',
  CHANGE_STATUS = 'ChangeStatus',
}
