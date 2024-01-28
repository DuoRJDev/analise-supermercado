import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3001' });

/**
 * Função que registra o token para requisições a api
 * @param {string} token Token gerado pelo login
 */
export const setToken = (token) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

/**
 *Função para tirar o registro de token da api
 */
export const removeToken = () => {
  api.defaults.headers.common.Authorization = '';
};
/**
 * Função que envia os dados de criação de conta para a api
 * @param body Nome, Sobrenome, Email, Senha, Estado, Região
 * @returns Retorna o token
 */
export const createAccount = async (body) => {
  const { data } = await api.post('/create-account', body);
  return data;
};

/**
 * Função que envia os dados de login para a api
 * @param {*} body Email e Senha
 * @returns Retorna o token
*/
export const requestLogin = async (body) => {
  const { data } = await api.post('/login', body);
  return data;
};

export default api;
