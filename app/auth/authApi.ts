import axios from 'axios';
const BASE_URL = 'http://54.159.8.194/';

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common['Content-Type'] = 'application/json';
// (...)
