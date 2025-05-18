import axios from 'axios';

const tokenauth = axios.create({
  baseURL: 'http://localhost:3001/authUser',

});

tokenauth.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `${token}`;
    
  }
  return config;
});

export default tokenauth;
