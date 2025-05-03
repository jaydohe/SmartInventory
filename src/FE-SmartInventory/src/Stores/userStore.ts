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
  userId: string | null;
  warehouseId: string | null;
  name: string | null;
  positionId: string | null;
  employeeId: string | null;
  role: string | null;
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
  
  userId: getByDecodedToken('userId'),
  warehouseId: getByDecodedToken('warehouseId'),
  name: getByDecodedToken('name'),
  positionId: getByDecodedToken('positionId'),
  employeeId: getByDecodedToken('employeeId'),
  role: getByDecodedToken('role')
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

        state.userId = getByDecodedToken('userId');
        state.warehouseId = getByDecodedToken('warehouseId');
        state.name = getByDecodedToken('name');
        state.positionId = getByDecodedToken('positionId');
        state.employeeId = getByDecodedToken('employeeId');
        state.role = getByDecodedToken('role');
      }),

    refreshTokenFn: (loginRes) =>
      set((state) => {
        localStorage.setItem('accessToken', loginRes.accessToken);
        localStorage.setItem('refreshToken', loginRes.refreshToken);

        state.accessToken = loginRes.accessToken;
        state.refreshToken = loginRes.refreshToken;
        state.isLogin = true;
        state.userId = getByDecodedToken('userId');
        state.warehouseId = getByDecodedToken('warehouseId');
        state.name = getByDecodedToken('name');
        state.positionId = getByDecodedToken('positionId');
        state.employeeId = getByDecodedToken('employeeId');
        state.role = getByDecodedToken('role');
      }),

    logOut: () =>
      set((state) => {
        console.log('logOut', state);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('info');
        state.isLogin = false;
        state.accessToken = null;
        state.refreshToken = null;

        state.userId = null;
        state.warehouseId = null;
        state.name = null;
        state.positionId = null;
        state.employeeId = null;
        state.role = null;
      }),
  }))
);

export const authStoreSelectors = createSelectors(AuthStore);
export default AuthStore;
