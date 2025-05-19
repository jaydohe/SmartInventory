import ActivityPage from '@/pages/Activity';
import CategoryProductPage from '@/pages/CategoryProductPage';
import CategoryWarehousePage from '@/pages/CategoryWarehousePage';

import { Route, Routes } from 'react-router-dom';

export default function CategoryRouter() {
  return (
    <Routes>
      <Route path="/product" element={<CategoryProductPage />}></Route>
      <Route path="/warehouse" element={<CategoryWarehousePage />}></Route>
    </Routes>
  );
}
