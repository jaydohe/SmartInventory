import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import AuthStore, { authStoreSelectors } from '@/Stores/userStore';
import ForbiddenStore from '@/Stores/forbiddenStore';
import { authSmartInventoryApi } from './authSmartInventoryApi';

const VITE_HRM_API = import.meta.env.VITE_HRM_API;

const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: false,
});

axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (err: any) => {
    const originalConfig = err.config;
    // console.log("resfetching token");

    if (originalConfig.url !== '/auth/login' && err.response) {
      console.log(err.response, !originalConfig._retry);
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          const localRefreshToken = localStorage.getItem('refreshToken');
          const localAccessToken = localStorage.getItem('accessToken');

          if (localRefreshToken && localAccessToken) {
            const data = { refreshToken: localRefreshToken, accessToken: localAccessToken };

            const res = await authSmartInventoryApi.refreshTokenApi(data);
            if (res.data && res.data?.accessToken && res.data?.refreshToken) {
              console.log('RefreshToken', res.data);
              AuthStore.getState().refreshTokenFn(res.data);
            }
          }

          return axiosClient(originalConfig);
        } catch (_error) {
          console.log('refreshTokenError', _error);
          AuthStore.getState().logOut();
          return Promise.reject(_error);
        }
      }
    }
    // console.log('end refresh');
    const { data, status } = err.response;
    // console.log('ERROR RESPONSE:', err.data);

    if (status === 403) {
      ForbiddenStore.getState().setForbidden(true);
      return Promise.reject({ data, status });
    }
    return Promise.reject(data);
  }
);

axiosClient.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem('accessToken');

    // console.log('axiosClient.interceptors.request', accessToken);
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error) => {
    console.log('ERROR RESPONSE:', error.response);
    return Promise.reject(error);
  }
);

export default axiosClient;
