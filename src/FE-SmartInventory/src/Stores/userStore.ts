import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from './createSelectors';
import { TLoginResponse } from '../interface';
const VITE_URL_HRM = import.meta.env.VITE_URL_HRM;
export type TAuthState = {
  isLogin: boolean;

  refreshToken: string | null;
  accessToken: string | null;
  unitId: string | null;
  userId: string | null;
  role: string | null;
  name: string | null;
};

type Actions = {
  refreshTokenFn: (loginRes: TLoginResponse) => void;
  logIn: (loginRes: TLoginResponse) => void;
  logOut: () => void;
};

const getByDecodedToken = (path: string) => {
  // get Token from localStorage
  let Token = localStorage.getItem('accessToken');

  // if there is Token => decode token and get role
  if (Token) {
    const decoded: any = jwtDecode(Token);
    // urlToken là code của BE trả trong token
    const urlToken = path;
    return decoded ? decoded[urlToken] : null;
  }
  // if there is no Token => decode token and get role
  if (!Token) return null;
};

const userInfo: TAuthState = {
  isLogin:
    localStorage.getItem('refreshToken') && localStorage.getItem('accessToken') ? true : false,
  refreshToken: localStorage.getItem('refreshToken') ?? null,
  accessToken: localStorage.getItem('accessToken') ?? null,
  
  unitId: getByDecodedToken('unitId'),
  userId: getByDecodedToken('userId'),
  role: getByDecodedToken('role'),
  name: getByDecodedToken('name'),
};

const AuthStore = create<TAuthState & Actions>()(
  immer((set) => ({
    ...userInfo,
    logIn: (loginRes) =>
      set((state) => {
        // console.log(loginRes, getByDecodedToken('nameid'));
        localStorage.setItem('accessToken', loginRes.accessToken);
        localStorage.setItem('refreshToken', loginRes.refreshToken);
        // console.log('info', JSON.parse(localStorage.getItem('info')!).agencyId ?? null);
        state.isLogin = true;
        state.accessToken = loginRes.accessToken;
        state.refreshToken = loginRes.refreshToken;

        state.role = getByDecodedToken('role');
        state.name = getByDecodedToken('name');
        state.unitId = getByDecodedToken('unitId');
        state.userId = getByDecodedToken('userId');
      }),

    refreshTokenFn: (loginRes) =>
      set((state) => {
        localStorage.setItem('accessToken', loginRes.accessToken);
        localStorage.setItem('refreshToken', loginRes.refreshToken);

        state.accessToken = loginRes.accessToken;
        state.refreshToken = loginRes.refreshToken;
        state.isLogin = true;
        state.role = getByDecodedToken('role');
        state.name = getByDecodedToken('name');
        state.unitId = getByDecodedToken('unitId');
        state.userId = getByDecodedToken('userId');
      }),

    logOut: () =>
      set((state) => {
        console.log('logOut', state);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        // localStorage.removeItem('agencyName');
        // localStorage.removeItem('myName');
        localStorage.removeItem('info');
        state.isLogin = false;
        state.accessToken = null;
        state.refreshToken = null;

        state.role = null;
        state.name = null;
        state.unitId = null;
        state.userId = null;
      }),
  }))
);

export const authStoreSelectors = createSelectors(AuthStore);
export default AuthStore;
