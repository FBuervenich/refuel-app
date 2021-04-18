import app from '@/main';
import axios, { AxiosRequestConfig } from 'axios';
import jwt_decode, { JwtPayload } from 'jwt-decode';

const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? VUE_APP_API_URL : '/api';
const TOKEN_LOCALSTORAGE = 'accessToken';

async function getAccessToken() {
  let accessToken = localStorage.getItem(TOKEN_LOCALSTORAGE);
  let decodedToken: JwtPayload | undefined;

  try {
    decodedToken = jwt_decode<JwtPayload>(accessToken ?? '');
  } catch (e) {
    console.info('missing/errornous jwt token');
  }

  if (
    !decodedToken ||
    !decodedToken.exp ||
    decodedToken.exp <= new Date().getTime() / 1000
  ) {
    const auth = app._context.provides['Auth'];
    await auth.getTokenSilently().then((token: string) => {
      localStorage.setItem(TOKEN_LOCALSTORAGE, token);
      accessToken = token;
    });
  }
  return accessToken;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const token = await getAccessToken();
  config.headers['Authorization'] = `Bearer ${token}`;

  return config;
});

export default api;
