import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import locations from '../helpers/locations';
import { actionAccountCreation, actionFillStates } from '../redux/actions';
import type ILocations from '../interfaces/Locations';
import type IGlobalState from '../interfaces/GlobalState';

function CreateAccount() {
  const [account, setAccount] = useState({ name: '', surname: '', email: '', password: '', repeatedPassword: '', state: 'Acre' });
  const [buttonToggle, setButtonToggle] = useState(true);
  // Redux
  const globalState: IGlobalState = useSelector((state) => state) as IGlobalState;
  const dispatch = useDispatch();
  // Validações
  const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  const specialCharsRegex = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;

  const onChangeInput = ({ name, value }: { name: string, value: string }): void => {
    setAccount({ ...account, [name]: value });
    // const filledInputs = account.name.length > 0 && account.surname.length > 0 && account.email.length > 0 && account.password.length > 0 && account.repeatedPassword.length > 0 && account.state.length > 0;
    const filledInputs = Object.keys(account).every(key => account[key].length > 0);
    setButtonToggle(!filledInputs);
  };

  const submitAccount = (): void => {
    const isEmailValid: boolean = emailRegex.test(account.email);
    if (account.name.length < 3) throw new Error('Nome muito pequeno');
    if (account.surname.length < 3) throw new Error('Sobrenome muito pequeno');
    if (!isEmailValid) throw new Error('Email inválido');
    const validPass: boolean = account.password === account.repeatedPassword && account.password.length >= 8 && specialCharsRegex.test(account.password);
    if (!validPass) throw new Error('Senha inválida');
    let region: string | undefined = globalState.locationsApi.states.find((state) => state.nome === account.state)?.regiao.nome;
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
        name="email"
        id="email"
        onChange={({ target }) => { onChangeInput(target); }}
        value={account.email} />

      <label htmlFor="password">Insira sua senha:</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={({ target }) => { onChangeInput(target); }} />

      <label htmlFor="repeat-password">Repita a sua senha:</label>
      <input
        type="password"
        name="repeatedPassword"
        id="repeatedPassword"
        onChange={({ target }) => { onChangeInput(target); }} />

      <select name="state" id="state" onChange={({ target }) => { onChangeInput(target); }} value={account.state}>
        {globalState.locationsApi.states.map((state: ILocations, index: number) => (
          <option key={index} value={state.nome}>{state.nome}</option>))}
      </select>

      <input type="button" name="submit-button" id="submit-button" value="Enviar" disabled={buttonToggle} onClick={submitAccount} />
    </div>
  );
}

export default CreateAccount;
