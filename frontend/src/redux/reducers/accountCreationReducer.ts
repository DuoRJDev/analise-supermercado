const initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  state: '',
  region: '',
  token: ''
};

interface ActionType {
  type: 'CREATE_ACCOUNT'
  payload: any
}

const accountCreationReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'CREATE_ACCOUNT':
      return {
        ...state,
        name: action.payload.name,
        surname: action.payload.surname,
        email: action.payload.email,
        password: action.payload.password,
        state: action.payload.state,
        region: action.payload.region
      };
    default:
      return state;
  }
};

export default accountCreationReducer;
