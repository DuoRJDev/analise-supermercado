import axios from 'axios';
import type ILocations from '../interfaces/Locations';

// async function getStatesApi(): Promise<ILocations[]> {
//   const result: ILocations[] = [];
//   const response = await axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
//   response.data.map((data) => result.push(data));
//   return result;
// }

export const getStatesApi = async (): Promise<ILocations[]> => {
  const response = await axios('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  const states = response.data;
  return states;
};

export default {
  getStatesApi
};
