import { Layout } from 'antd';
import React, { useContext, useEffect } from 'react';

const VITE_URL_HRM_LOGIN = import.meta.env.VITE_URL_HRM_LOGIN;
const VITE_URL_HRM_PROFILE = import.meta.env.VITE_URL_HRM_PROFILE;

import { Navigate, useLocation } from 'react-router';

import { authStoreSelectors } from '@/Stores/userStore';
import { SignalRContext } from '../Context';
import { forbiddenStoreSelectors } from '@/Stores/forbiddenStore';
import Forbidden from '@/Layout/Forbidden';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import Loading from './loading';
import PageContent from './PageContent';

const AdminLayout: React.FC = () => {
  const accessToken = authStoreSelectors.use.accessToken();
  const refreshToken = authStoreSelectors.use.refreshToken();
  const forbidden = forbiddenStoreSelectors.use.isForbidden();
  const userId = authStoreSelectors.use.userId();
  const wareId = authStoreSelectors.use.warehouseId();

  const { connection } = useContext(SignalRContext);

  useEffect(() => {
    if (userId && wareId) {
      HandleAuthenticateUser();
    }
  }, [userId, wareId, connection]);

  const HandleAuthenticateUser = () => {
    // console.log('-===================================', userId, connection);
    userId && wareId && connection?.registerUser(userId, wareId);
  };

  if (!accessToken && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  if (accessToken && refreshToken && location.pathname === '/') {
    return <Navigate to="/self" replace />;
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>{forbidden ? <Forbidden /> : <PageContent />}</Layout>
  );
};

export default AdminLayout;
