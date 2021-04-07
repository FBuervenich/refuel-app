import app from '@/main';
import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? VUE_APP_API_URL : '/api';

function getAccessToken() {
  const TOKEN_LOCALSTORAGE = 'accessToken';
  let accessToken = localStorage.getItem(TOKEN_LOCALSTORAGE);
  if (accessToken === null) {
    app.config.globalProperties.$auth
      .getTokenSilently()
      .then((token: string) => {
        localStorage.setItem(TOKEN_LOCALSTORAGE, token);
        accessToken = token;
      });
  }
  console.log('token', accessToken);
  return accessToken;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getAccessToken();
  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

export default api;
