import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import locations from '../helpers/locations';
import { actionAccountCreation, actionFillStates } from '../redux/actions';
import type ILocations from '../interfaces/Locations';

function CreateAccount() {
  const globalState = useSelector((state) => state);
  console.log(globalState);
  const dispatch = useDispatch();

  const submitAccount = (): void => {
    dispatch(actionAccountCreation({
      name: 'TESTE',
      surname: 'TESTE',
      email: 'TESTE',
      state: '',
      region: ''
    }));
  };

  useEffect(() => {
    const fetch = async () => {
      const apiStates = await locations.getStatesApi();
      if (apiStates) dispatch(actionFillStates(apiStates));
    };
    fetch();
  }, []);

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
        {globalState.locationsApi.states.map((state: ILocations, index: number) => (
          <option key={index} value={state.nome}>{state.nome}</option>))}
      </select>

      <input type="button" name="" id="" value="Enviar" onClick={submitAccount} />
    </div>
  );
}

export default CreateAccount;
