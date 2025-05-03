import ActivityPage from '@/pages/Activity';

import { Route, Routes } from 'react-router-dom';

export default function ActivityRouter() {
  return (
    <Routes>
      <Route path="/" element={<ActivityPage />}></Route>
    </Routes>
  );
}
