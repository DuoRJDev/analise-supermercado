import axios from 'axios';
import type ICreateAccount from '../interfaces/CreateAccount';

export const createAccount = async (data: ICreateAccount) => {
  const connection = await axios('localhost:3001');
  return connection;
};
