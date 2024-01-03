import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import locations from '../helpers/locations';
import { actionAccountCreation, actionFillStates } from '../redux/actions';
import type ILocations from '../interfaces/Locations';
import type IGlobalState from '../interfaces/GlobalState';

function CreateAccount() {
  const [account, setAccount] = useState({ name: '', surname: '', email: '', state: 'Acre' });
  const globalState: IGlobalState = useSelector((state) => state) as IGlobalState;
  const dispatch = useDispatch();
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  const onChangeInput = ({ name, value }: { name: string, value: string }): void => {
    console.log(value);
    console.log(name);
    switch (name) {
      case 'name':
        setAccount({ ...account, name: value });
        break;
      case 'surname':
        setAccount({ ...account, surname: value });
        break;
      case 'new-email':
        setAccount({ ...account, email: value });
        break;
      case 'state':
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
      if (apiStates.length > 0) dispatch(actionFillStates(apiStates));
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
        onChange={({ target }) => { onChangeInput(target); }}
        value={account.name} />

      <label htmlFor="surname">Sobrenome:</label>
      <input
        type="text"
        name="surname"
        id="surname"
        onChange={({ target }) => { onChangeInput(target); }}
        value={account.surname} />
      {/* State para verificar quando o email é válido e fazer uma interação com o usuário com popup e check verde */}
      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        name="new-email"
        id="new-email"
        onChange={({ target }) => { onChangeInput(target); }}
        value={account.email} />

      <label htmlFor="password">Insira sua senha:</label>
      <input
        type="password"
        name="password"
        id="password" />

      <label htmlFor="repeat-password">Repita a sua senha:</label>
      <input
        type="password"
        name="repeat-password"
        id="repeat-password" />

      <select name="state" id="state" onChange={({ target }) => { onChangeInput(target); }} value={account.state}>
        {globalState.locationsApi.states.map((state: ILocations, index: number) => (
          <option key={index} value={state.nome}>{state.nome}</option>))}
      </select>

      <input type="button" name="" id="" value="Enviar" onClick={submitAccount} />
    </div>
  );
}

export default CreateAccount;
