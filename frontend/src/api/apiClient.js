import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://vardaansolutions.vercel.app/api' || 'https://vardaansolutions.onrender.com/api',
  withCredentials: true,
});

export default apiClient;
