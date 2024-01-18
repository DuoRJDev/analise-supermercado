import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

export const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const createAccount = async (body) => {
  const { data } = await api.post('/create-account', body);
  return data;
};

export const requestLogin = async (body) => {
  const { data } = await api.post('/login', body);
  return data;
};

export default api;
