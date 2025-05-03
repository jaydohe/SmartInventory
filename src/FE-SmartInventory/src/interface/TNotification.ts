import { notifyLevel, TNotifyType } from '../Constant/NotificationState';
export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export type TNotification = {
  id: string; // id notifi
  createdAt: string;
  userId: string;
  targetId: string;
  type: TNotifyType;
  content: string;
  title: string;
  isMarked: boolean; // đã đọc thì cho mờ, chưa đọc thì sáng hơn
};

export type TResNotification = {
  notificationDetails: TNotification[];
  unreadNumber: number;
};

export type TOpenNotification = Pick<
  TNotification,
  'id' | 'title' | 'content' | 'type' | 'targetId'
>;
