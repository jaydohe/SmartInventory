import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import 'antd/dist/reset.css';
import ConfigProvider from 'antd/es/config-provider';
import localeVN from 'antd/locale/vi_VN';
import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import { SignalListener, SignalRContext } from './Context';
import Loading from './Layout/loading';

import { DefaultRouter } from './router';

import { useIsFetching, useIsMutating, useQueryClient } from '@tanstack/react-query';

const URL = import.meta.env.VITE_URL_SIGNALR ?? `https://esp-api.stlsolution.com`;

function App() {
  const [newConnection, setNewConnection] = useState<SignalListener | null>(null);
  // check loading react-query

  const queryClient = useQueryClient();

  const initHubConnection = async () => {
    console.log('initConnection');
    const hub = new SignalListener();
    hub && setNewConnection(hub);
  };

  useEffect(() => {
    initHubConnection();
  }, []);
  // check loading react-query

  return (
    <ConfigProvider
      // change global language app

      locale={localeVN}
      theme={{
        components: {
          Spin: {
            contentHeight: 500,
            dotSizeLG: 70,
          },
          Divider: {
            colorSplit: 'rgba(5, 5, 5, 0.16)',
          },
          Collapse: {
            // contentPadding: '0px 55px',
            headerPadding: '12px 16px 0px',
          },

          Layout: {
            /* here is your component tokens */
            headerBg: '#ffff',
          },
        },

        token: {
          fontFamily: "'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          fontSize: 15,
          colorBgLayout: '#f6f6f6',
          colorBgContainer: '#ffffff',
          colorPrimary: '#00b0ec',
          // colorInfo: '#0ea5e9',
          // colorWarning: '#FAAD14',
          // colorError: '#e71f45',
          // colorLink: 'rgb(27, 168, 255)',
        },
      }}
    >
      <SignalRContext.Provider
        value={{
          connection: newConnection,
          setConnection: setNewConnection,
        }}
      >
        <BrowserRouter>
          <DefaultRouter />
        </BrowserRouter>
      </SignalRContext.Provider>
    </ConfigProvider>
  );
}

export default App;
