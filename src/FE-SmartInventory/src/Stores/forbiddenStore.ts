
import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from './createSelectors';
import { TLoginResponse } from '../interface';

const VITE_URL_HRM_LOGIN = import.meta.env.VITE_URL_HRM_LOGIN;
export type TForbiddenState = {
  isForbidden: boolean;
};

type Actions = {
  setForbidden: (isForbidden: boolean) => void;
};

const forbidden: TForbiddenState = {
  isForbidden: false,
};

const ForbiddenStore = create<TForbiddenState & Actions>()(
  immer((set) => ({
    ...forbidden,
    setForbidden: (isForbidden) =>
      set((state) => {
        // console.log(isForbidden);
        state.isForbidden = isForbidden;
      }),
  }))
);

export const forbiddenStoreSelectors = createSelectors(ForbiddenStore);
export default ForbiddenStore;
