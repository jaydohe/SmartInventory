import Forbidden from '@/Layout/Forbidden';
import { forbiddenStoreSelectors } from '@/Stores/forbiddenStore';
import { authStoreSelectors } from '@/Stores/userStore';
import { Layout } from 'antd';
import * as React from 'react';
import { Navigate, useLocation } from 'react-router';

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const location = useLocation();
  const accessToken = authStoreSelectors.use.accessToken();
  const refreshToken = authStoreSelectors.use.refreshToken();
  const forbidden = forbiddenStoreSelectors.use.isForbidden();

  // const handleGetNotification = async () => {
  //   await dispatch(getNotificationData(SIZE_NOTIFY_HEADER)).unwrap();
  // };
  // useEffect(() => {
  //   if (agencyId) {
  //     HandleAuthenticateUser();
  //   }
  // }, [agencyId, connection]);

  // const HandleAuthenticateUser = () => {
  // console.log('-===================================', userId, connection);
  //   agencyId && connection?.registerAgencyId(agencyId);
  // };

  if (!accessToken && !refreshToken) {
    // console.log('AdminLayout Navigate');
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }

  return <Layout style={{ minHeight: '100vh' }}>{forbidden ? <Forbidden /> : <></>}</Layout>;
}
