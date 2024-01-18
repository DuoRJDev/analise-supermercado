import type IRegiao from './Region';

export default interface ILocations {
  id: number
  sigla: string
  nome: string
  regiao: IRegiao
}
