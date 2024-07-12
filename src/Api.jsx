import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://listtta-backend.lryftz.easypanel.host',
});

export default Api;
