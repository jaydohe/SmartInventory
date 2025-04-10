import 'dayjs/locale/vi';
import React from 'react';
import ReactDOM from 'react-dom/client';

// import { setupInterceptors } from './api/AxiosClient';
import App from './App';

import { ToastContainer } from 'react-toastify';
// import { store } from './apps/store';
import './index.css';
import ReactQueryProvider from '@/provider/ReactQueryProvider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ToastContainer
      theme="light"
      position="top-right"
      autoClose={3000}
      closeOnClick
      pauseOnHover={false}
    />
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </React.StrictMode>
);
