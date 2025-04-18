import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Scheme from '@/pages/Scheme/index';

const SchemeRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Scheme />} />
      {/* <Route path="/create" element={<CreateScheme />} />
      <Route path="/:id" element={<SchemeDetail />} />
      <Route path="/:id/update" element={<UpdateScheme />} /> */}
    </Routes>
  );
};

export default SchemeRouter;
