import User from '@/pages/User-copy';
import UserInfo from '@/pages/User-copy/Components/UserInfo';

import { Route, Routes } from 'react-router-dom';

export default function DashBoardRouter() {
  return (
    <Routes>
      <Route path="/" element={<Useres />}></Route>
    </Routes>
  );
}
