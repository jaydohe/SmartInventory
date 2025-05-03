import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';

import { authStoreSelectors } from '@/Stores/userStore';
import { RoleEnum } from '@/Constant';
// import { getRole, getToken } from '../../apps/Feature/authSlice/authSlice';

interface IProp {
  roleList: string[];
}
export const PrivateRouters: React.FC<IProp> = ({ roleList }) => {
  const location = useLocation();
  const accessToken = authStoreSelectors.use.accessToken();
  const refreshToken = authStoreSelectors.use.refreshToken();
  const role = authStoreSelectors.use.role();
  // const isClerical = authStoreSelectors.use.isClerical();

  if (!accessToken && !refreshToken) {
    return <Navigate to={'/login'} state={{ from: location }} replace />;
  }
  // console.log(roleList?.includes(role!), roleList, role);
  if (role && roleList?.includes(role)) {
    return <Outlet />;
  }

  return <Navigate to={'/403'} state={{ from: location }} replace />;
};
