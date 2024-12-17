import { getCookie } from '@/helper';
import axios from 'axios';
// import Cookies from 'js-cookie';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Base URL for your API
  // withCredentials: true, // Include cookies in cross-origin requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie('authToken');
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Unauthorized. Redirecting to login...');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
