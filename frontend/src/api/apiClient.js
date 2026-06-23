import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://vardaansolutions.onrender.com/api',
  withCredentials: true,
});

export default apiClient;
