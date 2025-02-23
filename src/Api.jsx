import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://listtta-backend.lryftz.easypanel.host',
  // baseURL: 'http://localhost:8080',
});

export default Api;
