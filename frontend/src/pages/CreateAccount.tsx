import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import locations from '../helpers/locations';
import { actionAccountCreation, actionFillStates } from '../redux/actions';
import type ILocations from '../interfaces/Locations';
import type IGlobalState from '../interfaces/GlobalState';

function CreateAccount() {
  const [account, setAccount] = useState({ name: '', surname: '', email: '', state: '' });
  const globalState: IGlobalState = useSelector((state) => state) as IGlobalState;
  console.log(globalState);
  const dispatch = useDispatch();
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  const onChangeInput = ({ name, value }: { name: string, value: string }): void => {
    switch (name) {
      case 'name':
        console.log('onChange NAME');
        setAccount({ ...account, name: value });
        break;
      case 'surname':
        console.log('onChange SURNAME');
        setAccount({ ...account, surname: value });
        break;
      case 'email':
        console.log('onChange EMAIL');
        setAccount({ ...account, email: value });
        break;
      case 'state':
        console.log('onChange STATE');
        setAccount({ ...account, state: value });
        break;
      default:
        break;
    }
  };

  const submitAccount = (): void => {
    const isEmailValid = emailRegex.test(account.email);
    if (!isEmailValid) throw new Error('Email inválido');
    let region = globalState.locationsApi.states.find((state) => state.nome === account.state)?.regiao.nome;
    if (region === undefined) region = '';
    dispatch(actionAccountCreation({
      name: account.name,
      surname: account.surname,
      email: account.email,
      state: account.state,
      region
    }));
  };

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const apiStates = await locations.getStatesApi();
      if (apiStates.length <= 0) dispatch(actionFillStates(apiStates));
    };
    fetch();
  }, []);

  return (
    <div>
      <label htmlFor="name">Nome:</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={({ target }) => onChangeInput(target)}
        value={account.name} />

      <label htmlFor="surname">Sobrenome:</label>
      <input
        type="text"
        name="surname"
        id="surname"
        value={account.surname} />

      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        name="new-email"
        id="new-email"
        value={account.email} />

      <label htmlFor="password">Insira sua senha:</label>
      <input
        type="password"
        name="password"
        id="password" />

      <label htmlFor="repeat-password">Repita a sua senha:</label>
      <input type="repeat-password" name="repeat-password" id="repeat-password" />

      <select name="state" id="state" value={account.state}>
        {globalState.locationsApi.states.map((state: ILocations, index: number) => (
          <option key={index} value={state.nome}>{state.nome}</option>))}
      </select>

      <input type="button" name="" id="" value="Enviar" onClick={submitAccount} />
    </div>
  );
}

export default CreateAccount;
