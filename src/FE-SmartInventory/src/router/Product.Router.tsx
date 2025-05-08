import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProductPage from '@/pages/Product';

export default function ProductRouter() {
  return (
    <Router>
        <Route path="/" element={<ProductPage />} ></Route>
    </Router>
  );
}
