import axios from 'axios';

const API_URL =
  process.env.NODE_ENV === 'production' ? process.env.API_URL : '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(config => {});

export default api;
