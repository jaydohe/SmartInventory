import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import SkeletonComponent from '@/Components/Skeleton';
import AdminLayout from '@/Layout/AdminLayout';
import Forbidden from '@/Layout/Forbidden';
import NotFound from '@/Layout/NotFound';
import LoginNew from '@/pages/LoginPage';

import { ADMIN, DEV, MAINTENANCE, OPERATION, SUPERVISION, TECHNICAL } from '@/Constant';
import DeviceMapRouter from '@/router/DeviceMap.Router';
import { PrivateRouters } from '../PrivateRouters';
import TicketIssueRouter from '../ReportTicket.Router';
import SelfRouter from '../Self.Router';
import IssueMapRouter from '../IssueMap.Router';
import UserRouter from '../User.router';
import SchemeRouter from '../Scheme.Router';
import MyReportTicketRouter from '../MyReportTicket.Router';
import CreateMyReportTicket from '@/pages/MyReportTicket/Components/CreateMyReportTicket';
import ReceivedScheme from '@/pages/ReceivedScheme';
import ActivityRouter from '../Activity.Router';

import DevicePageRouter from '../DevicePage.Router';

import DeviceTypeRouter from '../DeviceType.Router';

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
                  roleList={[ADMIN, OPERATION, DEV, SUPERVISION, TECHNICAL, MAINTENANCE]}
                />
              </Suspense>
            }
          >
            <Route path="/self" element={<SelfRouter />}></Route>
            <Route path="/device-map/*" element={<DeviceMapRouter />}></Route>
            <Route path="/map-issue/*" element={<IssueMapRouter />}></Route>
            <Route path="/ticket-issue/*" element={<TicketIssueRouter />}></Route>
            <Route path="/my-report/*" element={<MyReportTicketRouter />}></Route>
            <Route path="/report-issue/*" element={<CreateMyReportTicket />}></Route>
            <Route path="/received-scheme" element={<ReceivedScheme />}></Route>
          </Route>

          <Route
            element={
              <Suspense fallback={<SkeletonComponent />}>
                <PrivateRouters roleList={[ADMIN, DEV, OPERATION]} />
              </Suspense>
            }
          >
            <Route path="/self" element={<SelfRouter />}></Route>
            <Route path="/device-map/*" element={<DeviceMapRouter />}></Route>
            <Route path="/device/*" element={<DevicePageRouter />}></Route>
            <Route path="/map-issue/*" element={<IssueMapRouter />}></Route>
            <Route path="/ticket-issue/*" element={<TicketIssueRouter />}></Route>
            <Route path="/my-report/*" element={<MyReportTicketRouter />}></Route>
            <Route path="/report-issue/*" element={<CreateMyReportTicket />}></Route>
            <Route path="/activity/*" element={<ActivityRouter />}></Route>
            <Route path="/user/*" element={<UserRouter />}></Route>
            <Route path="/scheme/*" element={<SchemeRouter />}></Route>
            <Route path="/received-scheme" element={<ReceivedScheme />}></Route>
            <Route path="/device-type/*" element={<DeviceTypeRouter />}></Route>
          </Route>
        </Route>

        <Route path="*" element={<NotFound />}></Route>
        <Route path="/403" element={<Forbidden />}></Route>
      </Routes>
    </Suspense>
  );
};
