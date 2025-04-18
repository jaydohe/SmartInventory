import DashBoard from '@/pages/DeviceMap';
import MyReportTicket from '@/pages/MyReportTicket';

import { Route, Routes } from 'react-router-dom';

export default function MyReportTicketRouter() {
  return (
    <Routes>
      <Route path="/" element={<MyReportTicket />}></Route>
    </Routes>
  );
}
