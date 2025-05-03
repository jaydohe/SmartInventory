import { lazy } from 'react';
import { Route, Routes } from 'react-router';

const DeviceType = lazy(() => import('@/pages/DeviceType'));

const DeviceTypeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<DeviceType />} />
    </Routes>
  );
};

export default DeviceTypeRouter;