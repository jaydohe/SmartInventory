export interface ISelfRes {
  positionId: string ;
  positionName: string ;
  userId: string;
  code: string;
  name: string;
  loginName: string;
  wareId: string ;
  wareName: string ;
  departmentId: string ;
  departmentName: string ;
  gender: string ;
  isManage: boolean ;
  phoneNumber: string ;
  email: string ;
  address: string ;
  wardId: string ;
  ward?: {
    id: string;
    name: string;
    districtId: string;
  };
  districtId: string ;
  district?: {
    id: string;
    name: string;
    provinceId: string;
  };
  provinceId: string ;
  province?: {
    id: string;
    name: string;
  };
  dateHired: string ;
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
