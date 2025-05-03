export interface RoleObject {
    id: number;
    name: RoleEnumString;
  }
  export type RoleHierarchy = {
    [key in RoleEnum]: RoleEnum[];
  };
  
  export const DEV = 'DEV';
  export const ADMIN = 'ADMIN'; // quản trị viên
  export const STAFFFULL = 'STAFFFULL'; // nhân viên kho
  export const PRODUCERFULL = 'WAREHOUSE_PRODUCER'; // nhân viên sản xuất
  export const SALESFULL = 'SALESFULL'; // nhân viên bán hàng
  
  
  export enum RoleEnumString {
    DEV               = 'DEV',
    ADMIN             = 'ADMIN',
    STAFFFULL         = 'STAFFFULL',
    PRODUCERFULL      = 'WAREHOUSE_PRODUCER',
    SALESFULL         = 'SALESFULL',
  }
  
  export const USER_ROLES: RoleEnumString[] = [
    RoleEnumString.STAFFFULL,
    RoleEnumString.PRODUCERFULL,
    RoleEnumString.SALESFULL ,
  ];
  
  export enum RoleEnum {
    DEV               = 0,
    ADMIN             = 1, // quản trị viên
    STAFFFULL         = 2, // nhân viên kho
    PRODUCERFULL      = 3, // nhân viên sản xuất
    SALLESFULL        = 4,// nhân viên bán hàng

  }
  
  export enum AccountOptionEnum {
    CHANGE_PASSWORD = 'ChangPassWord',
    CHANGE_ROLE = 'ChangeRole',
    UPDATE_ACCOUNT = 'UpdateAccount',
  }
  
  export const ROLE: RoleObject[] = [
    { id: 0, name: RoleEnumString.DEV },
    { id: 1, name: RoleEnumString.ADMIN },
    { id: 2, name: RoleEnumString.STAFFFULL  },
    { id: 3, name: RoleEnumString.PRODUCERFULL },
    { id: 4, name: RoleEnumString.SALESFULL  },
  ];
  
  // Define role hierarchy mapping
  export const ROLE_HIERARCHY: { [key: string]: string[] } = {
    DEV: ['DEV'],
    ADMIN: ['DEV', 'ADMIN', 'TECHNICAL', 'MAINTENANCE'],
    STAFFFULL: ['DEV', 'ADMIN', 'STAFFFULL'],
    PRODUCERFUL:['DEV', 'ADMIN', 'PRODUCERFULL'],
    SALESFULL:['DEV', 'ADMIN', 'SALESFULL'],
  };
  
  export const roleName = {
    [RoleEnumString.DEV]: 'Dev',
    [RoleEnumString.ADMIN]: 'Admin',
    [RoleEnumString.STAFFFULL]: 'Nhân viên kho',
    [RoleEnumString.PRODUCERFULL]: 'Nhân viên sản xuất',
    [RoleEnumString.SALESFULL]: 'Nhân viên bán hàng',
  };
  
  export const roleNumToStr = {
    [RoleEnum.DEV]: RoleEnumString.DEV,
    [RoleEnum.ADMIN]: RoleEnumString.ADMIN,
    [RoleEnum.STAFFFULL]: RoleEnumString.STAFFFULL,
    [RoleEnum.PRODUCERFULL]: RoleEnumString.PRODUCERFULL,
    [RoleEnum.SALLESFULL]: RoleEnumString.SALESFULL,

  };
  
  export enum UserOptionEnum {
    CHANGE_PASSWORD = 'ChangPassWord',
    CHANGE_ROLE = 'ChangeRole',
    UPDATE_ACCOUNT = 'UpdateAccount',
    CHANGE_STATUS = 'ChangeStatus',
  }
  