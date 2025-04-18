import DeviceMap from '@/pages/DeviceMap';

import { Route, Routes } from 'react-router-dom';

export default function DeviceMapRouter() {
  return (
    <Routes>
      <Route path="/" element={<DeviceMap />}></Route>
    </Routes>
  );
}
