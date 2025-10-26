import axios from 'axios';

const API = axios.create({
  baseURL: 'https://malindihigh.pythonanywhere.com/', 
});

// Automatically attach JWT
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
