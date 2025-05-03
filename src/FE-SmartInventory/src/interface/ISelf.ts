export interface ISelfRes {
  refId: number | null;
  userId: string;
  unitId: string;
  name: string;
  unitName: string;
  loginName: string;
}
export interface IUpdatePasswordSelf {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

export interface IUpdateUserInfo {
  refId: number;
  name: string;
  loginName: string;
}
