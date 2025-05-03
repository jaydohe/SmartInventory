export type TLoginForm = {
  loginName: string;
  password: string;
};


export type TLoginResponse = {

  refreshToken: string;
  accessToken: string;
  expireTime: string;
};

export type TRefreshTokenFrom = Omit<TLoginResponse, 'expireTime' | 'info'>;

export interface TForgotPassword {
  email: string;
}

export type TRegister = {
  name: string;
  referralCode: string;
  userName: string;
  password: string;
  confirmPassword: string;
  email: string;
  phoneNumber: string;
  cityCode: number;
  districtCode: number;
  wardCode: number;
  address: string;
};
