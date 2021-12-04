import axios from 'axios';

export const baseUrl = 'http://127.0.0.1:8080';

const axiosClient = axios.create({
  baseURL: `${baseUrl}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.defaults.withCredentials = false;

axiosClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});

export default axiosClient;
