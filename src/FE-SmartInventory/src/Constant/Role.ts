export interface RoleObject {
  id: number;
  name: RoleEnumString;
}
export type RoleHierarchy = {
  [key in RoleEnum]: RoleEnum[];
};

export const DEV = 'DEV';
export const ADMIN = 'ADMIN';
export const OPERATION = 'OPERATION';
export const SUPERVISION = 'SUPERVISION';
export const TECHNICAL = 'TECHNICAL';
export const MAINTENANCE = 'MAINTENANCE';

export enum RoleEnumString {
  DEV = 'DEV',
  ADMIN = 'ADMIN',
  OPERATION = 'OPERATION', // vận hành
  SUPERVISION = 'SUPERVISION', // giám sát
  TECHNICAL = 'TECHNICAL', // kĩ thuật
  MAINTENANCE = 'MAINTENANCE', // thợ
}

export const USER_ROLES: RoleEnumString[] = [
  RoleEnumString.OPERATION,
  RoleEnumString.SUPERVISION,
  RoleEnumString.TECHNICAL,
  RoleEnumString.MAINTENANCE,
];

export enum RoleEnum {
  DEV = 0,
  ADMIN = 1,
  OPERATION = 2, // vận hành
  SUPERVISION = 3, // giám sát
  TECHNICAL = 4, // kĩ thuật
  MAINTENANCE = 5, // thợ
}

export enum AccountOptionEnum {
  CHANGE_PASSWORD = 'ChangPassWord',
  CHANGE_ROLE = 'ChangeRole',
  UPDATE_ACCOUNT = 'UpdateAccount',
}

export const ROLE: RoleObject[] = [
  { id: 0, name: RoleEnumString.DEV },
  { id: 1, name: RoleEnumString.ADMIN },
  { id: 2, name: RoleEnumString.OPERATION },
  { id: 3, name: RoleEnumString.SUPERVISION },
  { id: 4, name: RoleEnumString.TECHNICAL },
  { id: 5, name: RoleEnumString.MAINTENANCE },
];

// Define role hierarchy mapping
export const ROLE_HIERARCHY: { [key: string]: string[] } = {
  DEV: ['ADMIN', 'OPERATION', 'SUPERVISION', 'TECHNICAL', 'MAINTENANCE'],
  ADMIN: ['OPERATION', 'SUPERVISION', 'TECHNICAL', 'MAINTENANCE'],
  OPERATION: ['SUPERVISION', 'TECHNICAL', 'MAINTENANCE'],
};

export const roleName = {
  [RoleEnumString.DEV]: 'Dev',
  [RoleEnumString.ADMIN]: 'Admin',
  [RoleEnumString.OPERATION]: 'Vận hành',
  [RoleEnumString.SUPERVISION]: 'Giám sát',
  [RoleEnumString.TECHNICAL]: 'Kĩ thuật',
  [RoleEnumString.MAINTENANCE]: 'Lắp đặt',
};

export const roleNumToStr = {
  [RoleEnum.DEV]: RoleEnumString.DEV,
  [RoleEnum.ADMIN]: RoleEnumString.ADMIN,
  [RoleEnum.OPERATION]: RoleEnumString.OPERATION,
  [RoleEnum.SUPERVISION]: RoleEnumString.SUPERVISION,
  [RoleEnum.TECHNICAL]: RoleEnumString.TECHNICAL,
  [RoleEnum.MAINTENANCE]: RoleEnumString.MAINTENANCE,
};

export enum UserOptionEnum {
  CHANGE_PASSWORD = 'ChangPassWord',
  CHANGE_ROLE = 'ChangeRole',
  UPDATE_ACCOUNT = 'UpdateAccount',
  CHANGE_STATUS = 'ChangeStatus',
}
