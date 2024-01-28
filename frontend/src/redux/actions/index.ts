import type IAccount from '../../interfaces/Account';
import type ILocations from '../../interfaces/Locations';

interface ICreateAction {
  type: 'CREATE_ACCOUNT'
  payload: IAccount
}

interface IStatesAction {
  type: 'FILL_STATES_API'
  payload: ILocations[]
}

export const actionAccountCreation = (account: IAccount): ICreateAction => ({ type: 'CREATE_ACCOUNT', payload: account });

export const actionFillStates = (states: ILocations[]): IStatesAction => ({ type: 'FILL_STATES_API', payload: states });
