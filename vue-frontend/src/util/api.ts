import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production' ? VUE_APP_API_URL : '/api';

console.log('API URL is: ', API_BASE_URL);
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// api.interceptors.request.use(config => {});

export default api;
