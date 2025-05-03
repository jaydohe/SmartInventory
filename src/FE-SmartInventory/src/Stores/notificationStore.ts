import { jwtDecode } from 'jwt-decode';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from './createSelectors';
import { TLoginResponse } from '../interface';

export type TForbiddenState = {
  // isForbidden: boolean;
  unreadNumber: number;
};

type Actions = {
  setUnRead: (unRead: number) => void;
};

const notification: TForbiddenState = {
  unreadNumber: 0,
};

const NotificationStore = create<TForbiddenState & Actions>()(
  immer((set) => ({
    ...notification,
    setUnRead: (unRead) =>
      set((state) => {
        // console.log('NotificationStore unRead', unRead);
        state.unreadNumber = unRead;
      }),
  }))
);

export const notificationStoreSelectors = createSelectors(NotificationStore);
export default NotificationStore;
