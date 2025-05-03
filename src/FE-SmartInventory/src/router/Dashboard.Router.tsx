import Dashboard from '@/pages/Dashboard';

import { Route, Routes } from 'react-router-dom';

export default function DashboardRouter() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
    </Routes>
  );
}
