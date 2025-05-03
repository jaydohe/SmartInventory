import SkeletonComponent from '@/Components/Skeleton/index';
import { NavigateNotifyPage, QueryKeys, SIZE_NOTIFY_ALL, TNotifyType } from '@/Constant';
import { useIsFetching, useIsMutating, useQueryClient } from '@tanstack/react-query';
import { Button, Layout, notification, Space, Tag } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { Suspense, useContext, useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { SignalRContext } from '../../Context';
import Header from '../Header';
import Loading from '../loading';
import { NotificationType, TNotification, TOpenNotification } from '@/interface';
import { authStoreSelectors } from '@/Stores/userStore';
import { useGetNotification, useGetUnReadCount } from '@/hook/useGetNotification';
import { useBuilderQuery } from '@/hook';
import NotificationStore from '@/Stores/notificationStore';
// import { useAppDispatch } from '../../apps/hooks';
// import { addNotification } from '../../apps/Feature/NotificationSlice';
export interface PageContentProps {}

export default function PageContent({}: PageContentProps) {
  const queryClient = useQueryClient();
  const wareId = authStoreSelectors.use.warehouseId();
  const userId = authStoreSelectors.use.userId();
  const accessToken = authStoreSelectors.use.accessToken();

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const { data } = useGetUnReadCount(
    useBuilderQuery({
      toPaging: {
        page: 1,
        pageSize: SIZE_NOTIFY_ALL,
      },
    })
  );
  const { connection } = useContext(SignalRContext);
  const { markAsRead } = useGetNotification('');
  const [api, contextHolder] = notification.useNotification({
    stack: { threshold: 1 },
  });

  const openNotificationWithIcon = (type: NotificationType, notifyData: TOpenNotification) => {
    console.log(
      notifyData.type !== TNotifyType.ORDER_OWNER,
    );
    const btnViewTicket = (
      <Space>
        <Button type="default" size="middle" onClick={() => api.destroy()}>
          Xoá tất cả
        </Button>

        {(
            <Button
              type="primary"
              size="middle"
              onClick={() => {
                const { id, type, targetId } = notifyData;
                api.destroy(id);
                navigate(NavigateNotifyPage(type), { state: { targetId: targetId } });
                const data = [id];
                markAsRead.mutate(data);
              }}
            >
              Xem chi tiết
            </Button>
          )}
      </Space>
    );
    api[type]({
      message: (
        <Tag color="orange" className="text-base font-medium ">
          {notifyData.title}
        </Tag>
      ),
      description: `${notifyData.content}`,
      duration: 0,
      placement: 'bottomLeft',
      key: notifyData.id,
      btn: btnViewTicket,
    });
  };

  const handleGetNotification = async () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.UNREAD_NOTIFICATION] });
    queryClient.invalidateQueries({ queryKey: [QueryKeys.NOTIFY] });
  };
  const handleSyncNotifyData = () => {
    connection!.commandNotify = async (res: TOpenNotification) => {
      console.log('Notification form AdminLayout', res);
      openNotificationWithIcon('warning', res);
      handleGetNotification();
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.GET_ALL_ORDERS],
      });
    };
  };
  useEffect(() => {
    // console.log('Notify unRead', data);
    if (accessToken && data?.data !== undefined && data.data !== null && data.data >= 0) {
      NotificationStore.getState().setUnRead(data.data);
    }
  }, [accessToken, data]);

  useEffect(() => {
    // console.log('-===================================', userId);
    // Get Notification when user is authenticated
    userId && wareId && handleGetNotification();
  }, [userId, wareId, accessToken]);

  useEffect(() => {
    // get Online kiosk list form HUB
    connection && handleSyncNotifyData();
  }, [connection]);

  const isFetching = useIsFetching();
  const isMutating = useIsMutating();
  return (
    <Suspense fallback={<SkeletonComponent />}>
      {/* <Loading /> */}
      {isFetching + isMutating !== 0 && <Loading />}
      {contextHolder}
      <Layout className={` site-layout  transition-all	 ease-linear duration-[10]  relative     `}>
        <Header></Header>

        <Content className="my-0  ">
          <Outlet />
        </Content>
        {/* <Footer /> */}
      </Layout>
    </Suspense>
  );
}
