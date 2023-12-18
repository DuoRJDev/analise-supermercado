import type ILocations from '../../interfaces/Locations';

interface Account {
  name: string
  surname: string
  email: string
  state: string
  region: string
}

export const actionAccountCreation = (account: Account) => ({ type: 'CREATE_ACCOUNT', payload: account });

export const actionFillStates = (states: ILocations[]) => ({ type: 'FILL_STATES_API', payload: states });
