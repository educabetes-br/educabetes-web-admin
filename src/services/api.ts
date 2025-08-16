import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-educabetes.gouveiabuff.com/'
});

export default api;
