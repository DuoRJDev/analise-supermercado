import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import locations from '../helpers/locations';
import { actionAccountCreation, actionFillStates } from '../redux/actions';

function CreateAccount() {
  const states = locations.getStatesApi();
  const globalState = useSelector((state) => state);
  console.log(globalState);
  console.log(states);
  const dispatch = useDispatch();
  // dispatch(actionFillStates(states));
  dispatch(actionAccountCreation({ name: 'TESTE', surname: 'TESTE', email: 'TESTE', password: 'TESTE', state: '', region: '' }));
  return (
    <div>
      <label htmlFor="name">Nome:</label>
      <input type="text" name="name" id="name" />
      <label htmlFor="surname">Sobrenome:</label>
      <input type="text" name="surname" id="surname" />
      <label htmlFor="email">E-mail:</label>
      <input type="email" name="new-email" id="new-email" />
      <label htmlFor="password">Insira sua senha:</label>
      <input type="password" name="password" id="password" />
      <label htmlFor="repeat-password">Repita a sua senha:</label>
      <input type="repeat-password" name="repeat-password" id="repeat-password" />
      <select name="" id="">
        {/* {states?.map((state: ILocations, index: number) => (
          <option key={index} value={state.nome}>{state.nome}</option>)
        )} */}
      </select>
    </div>
  );
}

export default CreateAccount;
