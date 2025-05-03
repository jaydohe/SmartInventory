import { Layout } from 'antd';
import React, { useContext, useEffect } from 'react';

import PageContent from './PageContent';

const VITE_URL_HRM_LOGIN = import.meta.env.VITE_URL_HRM_LOGIN;
const VITE_URL_HRM_PROFILE = import.meta.env.VITE_URL_HRM_PROFILE;

import { Navigate, useLocation } from 'react-router';

import { authStoreSelectors } from '@/Stores/userStore';
import { SIZE_NOTIFY_HEADER } from '../Constant/NotificationState';
import { SignalRContext } from '../Context';
import { forbiddenStoreSelectors } from '@/Stores/forbiddenStore';
import Forbidden from '@/Layout/Forbidden';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Loading from './loading';

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const accessToken = authStoreSelectors.use.accessToken();
  const refreshToken = authStoreSelectors.use.refreshToken();
  const forbidden = forbiddenStoreSelectors.use.isForbidden();
  const userId = authStoreSelectors.use.userId();
  const unitId = authStoreSelectors.use.unitId();

  const { connection } = useContext(SignalRContext);

  useEffect(() => {
    if (userId && unitId) {
      HandleAuthenticateUser();
    }
  }, [userId, unitId, connection]);

  const HandleAuthenticateUser = () => {
    // console.log('-===================================', userId, connection);
    userId && unitId && connection?.registerUser(userId, unitId);
  };

  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  if (accessToken && refreshToken && location.pathname === '/') {
    return <Navigate to="/device-map" replace />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>{forbidden ? <Forbidden /> : <PageContent />}</Layout>
  );
};

export default AdminLayout;
