import { legacy_createStore as createStore, combineReducers } from 'redux';
import accountCreationReducer from './reducers/accountCreationReducer';
import { composeWithDevTools } from '@redux-devtools/extension';
import fillStatesReducer from './reducers/fillStatesApi';

const rootReducer = combineReducers({
  accountCreation: accountCreationReducer,
  locationsApi: fillStatesReducer
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
