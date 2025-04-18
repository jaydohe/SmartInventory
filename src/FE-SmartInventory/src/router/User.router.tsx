import User from '@/pages/User';
import UserInfo from '@/pages/User/Components/UserInfo';

import { Route, Routes } from 'react-router-dom';

export default function DashBoardRouter() {
  return (
    <Routes>
      <Route path="/" element={<User />}></Route>
    </Routes>
  );
}
