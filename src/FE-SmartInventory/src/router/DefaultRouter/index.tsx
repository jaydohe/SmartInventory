import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import SkeletonComponent from '@/Components/Skeleton';
import AdminLayout from '@/Layout/AdminLayout';
import Forbidden from '@/Layout/Forbidden';
import NotFound from '@/Layout/NotFound';
import LoginNew from '@/pages/LoginPage';

import { DEV, ADMIN, WAREHOUSE_STAFF, WAREHOUSE_PRODUCER, SALESMAN } from '@/Constant';
import { PrivateRouters } from '../PrivateRouters';
import SelfRouter from '../Self.Router';
import UserRouter from '../User.router';
import ActivityRouter from '../Activity.Router';

export const DefaultRouter = () => {
  return (
    <Suspense fallback={<SkeletonComponent />}>
      <Routes>
        <Route path="/login" element={<LoginNew />} />

        <Route path="/" element={<AdminLayout />}>
          {/* <Route path="/dashboard" element={<DashboardRouter />} /> */}

          <Route
            element={
              <Suspense fallback={<SkeletonComponent />}>
                <PrivateRouters
                  roleList={[DEV, ADMIN, WAREHOUSE_STAFF, WAREHOUSE_PRODUCER, SALESMAN]}
                />
              </Suspense>
            }
          >
            <Route path="/self" element={<SelfRouter />}></Route>
          </Route>

          <Route
            element={
              <Suspense fallback={<SkeletonComponent />}>
                <PrivateRouters roleList={[DEV, ADMIN]} />
              </Suspense>
            }
          >
            <Route path="/self" element={<SelfRouter />}></Route>
            <Route path="/activity/*" element={<ActivityRouter />}></Route>
            <Route path="/user/*" element={<UserRouter />}></Route>
          </Route>

          <Route
            element={
              <Suspense fallback={<SkeletonComponent />}>
                <PrivateRouters roleList={[WAREHOUSE_STAFF]} />
              </Suspense>
            }
          >
            <Route path="/self" element={<SelfRouter />}></Route>
            <Route path="/activity/*" element={<ActivityRouter />}></Route>
          </Route>
          
        </Route>

        <Route path="*" element={<NotFound />}></Route>
        <Route path="/403" element={<Forbidden />}></Route>
      </Routes>
    </Suspense>
  );
};
