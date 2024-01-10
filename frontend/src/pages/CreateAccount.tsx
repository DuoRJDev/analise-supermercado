import React, { useEffect, useState } from 'react';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import locations from '../helpers/locations';
import { actionAccountCreation, actionFillStates } from '../redux/actions';
import type ILocations from '../interfaces/Locations';
import type IGlobalState from '../interfaces/GlobalState';
import type ICreateAccount from '../interfaces/CreateAccount';
import { createAccount, setToken } from '../helpers/connection';
import { Navigate } from 'react-router-dom';

function CreateAccount() {
  const [account, setAccount] = useState({ name: '', surname: '', email: '', password: '', repeatedPassword: '', state: 'Acre' });
  const [buttonToggle, setButtonToggle] = useState(true);
  // Estado para gerenciar os alertas de preenchimento
  const [validInput, setValidInput] = useState({ name: false, surname: false, email: false, password: false, repeatedPassword: false });
  const [createSuccesfull, setCreateSuccesfull] = useState(false);
  // Redux
  const globalState: IGlobalState = useSelector((state) => state) as IGlobalState;
  const dispatch = useDispatch();
  // Validações
  const emailRegex = /^[a-z0-9.-_]+@[a-z0-9.-]+\.[a-z]+$/i;
  const specialCharsRegex = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
  const numberRegex = /[^0-9]/;

  const onChangeInput = ({ name, value }: { name: string, value: string }): void => {
    setAccount({ ...account, [name]: value });
    const filledInputs = Object.keys(account).every(key => account[key].length > 0);
    // Evitar chamadas desnecessárias
    if (name !== 'state') validateInputs(name, value);
    setButtonToggle(!filledInputs && Object.values(validInput).every(bool => bool));
  };
  // Função para validar os inputs no global state
  const validateInputs = (name: string, value: string): void => {
    switch (name) {
      case 'name':
        value.length > 3 && numberRegex.test(value)
          ? setValidInput({ ...validInput, [name]: true })
          : setValidInput({ ...validInput, [name]: false });
        break;
      case 'surname':
        value.length > 3 && numberRegex.test(value)
          ? setValidInput({ ...validInput, [name]: true })
          : setValidInput({ ...validInput, [name]: false });
        break;
      case 'email':
        value.length > 5 && emailRegex.test(value)
          ? setValidInput({ ...validInput, [name]: true })
          : setValidInput({ ...validInput, [name]: false });
        break;
      case 'password':
        value.length >= 8 && specialCharsRegex.test(value) && value.length <= 16
          ? setValidInput({ ...validInput, [name]: true })
          : setValidInput({ ...validInput, [name]: false });
        break;
      case 'repeatedPassword':
        value === account.password
          ? setValidInput({ ...validInput, [name]: true })
          : setValidInput({ ...validInput, [name]: false });
        break;
      default:
        break;
    }
  };

  const submitAccount = async (): Promise<void> => {
    let region: string | undefined = globalState.locationsApi.states.find((state) => state.nome === account.state)?.regiao.nome;
    if (region === undefined) region = '';
    dispatch(actionAccountCreation({
      name: account.name,
      surname: account.surname,
      email: account.email,
      state: account.state,
      region
    }));
    const bodyData: ICreateAccount = {
      name: account.name,
      surname: account.surname,
      email: account.email,
      password: account.password,
      state: account.state,
      region
    };
    try {
      const { token, role } = await createAccount(bodyData);

      setToken(token);

      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      setCreateSuccesfull(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetch = async (): Promise<void> => {
      const apiStates = await locations.getStatesApi();
      if (apiStates.length > 0) dispatch(actionFillStates(apiStates));
    };
    fetch();
  }, []);

  // Depois que criada a conta é feito o redirecionamento para a página Home
  if (createSuccesfull) return <Navigate to="/login" />;

  return (
    <div>
      <label htmlFor="name">Nome:
        <input
          type="text"
          name="name"
          id="name"
          onChange={({ target }) => { onChangeInput(target); }}
          value={account.name} />
        {validInput.name ? <FiCheck /> : <FiAlertTriangle title='Seu nome precisa ter mais de 3 caracteres' />}
      </label>

      <label htmlFor="surname">Sobrenome:</label>
      <input
        type="text"
        name="surname"
        id="surname"
        onChange={({ target }) => { onChangeInput(target); }}
        value={account.surname} />
      {validInput.surname ? <FiCheck /> : <FiAlertTriangle />}
      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={({ target }) => { onChangeInput(target); }}
        value={account.email} />
      {validInput.email ? <FiCheck /> : <FiAlertTriangle />}

      <label htmlFor="password">Insira sua senha:</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={({ target }) => { onChangeInput(target); }} />
      {validInput.password ? <FiCheck /> : <FiAlertTriangle />}

      <label htmlFor="repeat-password">Repita a sua senha:</label>
      <input
        type="password"
        name="repeatedPassword"
        id="repeatedPassword"
        onChange={({ target }) => { onChangeInput(target); }} />
      {validInput.repeatedPassword ? <FiCheck /> : <FiAlertTriangle />}

      <select name="state" id="state" onChange={({ target }) => { onChangeInput(target); }} value={account.state}>
        {globalState.locationsApi.states.map((state: ILocations, index: number) => (
          <option key={index} value={state.nome}>{state.nome}</option>))}
      </select>

      <input type="button" name="submit-button" id="submit-button" value="Enviar" disabled={buttonToggle} onClick={submitAccount} />
    </div>
  );
}

export default CreateAccount;
