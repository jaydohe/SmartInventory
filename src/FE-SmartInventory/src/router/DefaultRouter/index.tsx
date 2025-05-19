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
import PositionPage from '@/pages/PositionPage';
import DepartmentPage from '@/pages/DepartmentPage';
import EmployeePage from '@/pages/Employee';
import CateloryRouter from '../Category.Router';
import CategoryRouter from '../Category.Router';
import WarehousePage from '@/pages/Warehouse';
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
            <Route path="/position" element={<PositionPage />}></Route>
            <Route path="/department" element={<DepartmentPage />}></Route>
            <Route path="/category/*" element={<CategoryRouter />}></Route>
          </Route>

          <Route
            element={
              <Suspense fallback={<SkeletonComponent />}>
                <PrivateRouters roleList={[DEV, ADMIN]} />
              </Suspense>
            }
          >
            <Route path="/warehouse" element={<WarehousePage />}></Route>

            <Route path="/activity/*" element={<ActivityRouter />}></Route>
            <Route path="/user/*" element={<UserRouter />}></Route>
            <Route path="/employee/*" element={<EmployeePage />}></Route>
          </Route>

          <Route
            element={
              <Suspense fallback={<SkeletonComponent />}>
                <PrivateRouters roleList={[WAREHOUSE_STAFF]} />
              </Suspense>
            }
          >
            <Route path="/activity/*" element={<ActivityRouter />}></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
        <Route path="/403" element={<Forbidden />}></Route>
      </Routes>
    </Suspense>
  );
};
