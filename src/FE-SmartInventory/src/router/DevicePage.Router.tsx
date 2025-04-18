import DevicePage from '@/pages/DeviecPage';

import { Route, Routes } from 'react-router-dom';

export default function DevicePageRouter() {
  return (
    <Routes>
      <Route path="/" element={<DevicePage />}></Route>
    </Routes>
  );
}
