export interface ISelfRes {
  positionId: string | null;
  positionName: string | null;
  userId: string;
  code: string;
  name: string;
  loginName: string;
  wareId: string | null;
  wareName: string | null;
  departmentId: string | null;
  departmentName: string | null;
  gender: string | null;
  isManage: boolean | null;
  phoneNumber: string | null;
  email: string | null;
  address: string | null;
  wardId: string | null;
  ward?: {
    id: string;
    name: string;
    districtId: string;
  };
  districtId: string | null;
  district?: {
    id: string;
    name: string;
    provinceId: string;
  };
  provinceId: string | null;
  province?: {
    id: string;
    name: string;
  };
  dateHired: string | null;
}
export interface IUpdatePasswordSelf {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
}

export interface IUpdateUserInfo {
  loginName: string | null;
  gender: string | null;
  phoneNumber: string | null;
  email: string | null;
}
