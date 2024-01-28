import type ILocations from '../../interfaces/Locations';

const initialState = {
  states: []
};

interface ActionType {
  type: 'FILL_STATES_API'
  payload: ILocations[]
}

const fillStatesReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'FILL_STATES_API':
      return { states: action.payload };
    default:
      return state;
  }
};

export default fillStatesReducer;
