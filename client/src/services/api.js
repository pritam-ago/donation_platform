import axios from 'axios';

const api = axios.create({
  baseURL: 'https://donation-platform-api.vercel.app',  
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export default api;
