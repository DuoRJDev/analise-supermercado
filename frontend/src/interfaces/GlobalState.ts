import type IAccount from './Account';
import type ILocations from './Locations';

export default interface IGlobalState {
  accountCreation: IAccount
  locationsApi: {
    states: ILocations[]
  }
}
