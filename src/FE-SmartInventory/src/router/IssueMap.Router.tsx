import DeviceMap from '@/pages/DeviceMap';
import IssueMap from '@/pages/IssueMap';

import { Route, Routes } from 'react-router-dom';

export default function IssueMapRouter() {
  return (
    <Routes>
      <Route path="/" element={<IssueMap />}></Route>
    </Routes>
  );
}
