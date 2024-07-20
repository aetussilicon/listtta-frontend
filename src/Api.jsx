import axios from 'axios';

const backendURL = import.meta.env.VITE_BACKEND_URL;

const Api = axios.create({
  baseURL: backendURL,
});

export default Api;
