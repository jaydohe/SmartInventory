import DashBoard from '@/pages/DeviceMap';
import MyReportTicket from '@/pages/MyReportTicket';
import ReportTicket from '@/pages/ReportTicket';

import { Route, Routes } from 'react-router-dom';

export default function TicketIssueRouter() {
  return (
    <Routes>
      <Route path="/" element={<ReportTicket />}></Route>
    </Routes>
  );
}
