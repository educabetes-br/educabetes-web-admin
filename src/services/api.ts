import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-educabetes.citistaging.com'
});

export default api;
