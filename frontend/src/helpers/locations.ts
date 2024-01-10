import axios from 'axios';
import type ILocations from '../interfaces/Locations';

export const getStatesApi = async (): Promise<ILocations[]> => {
  const response = await axios('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
  const states = response.data.sort((stateA: ILocations, stateB: ILocations) => {
    if (stateA.nome > stateB.nome) return 1;
    if (stateA.nome < stateB.nome) return -1;
    return 0;
  });
  return states;
};

// export const getStatesApii = async (): Promise<ILocations[]> => fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then((d) => d.json()).then((r) => r);

export default {
  getStatesApi
  // getStatesApii
};
