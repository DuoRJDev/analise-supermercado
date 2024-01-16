import React, { useEffect, useState } from 'react';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import locations from '../helpers/locations';
import { actionFillStates } from '../redux/actions';
import type ILocations from '../interfaces/Locations';
import type ICreateAccount from '../interfaces/CreateAccount';
import { createAccount, setToken } from '../helpers/connection';
import { Navigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';

function CreateAccount(): React.ReactElement {
  const [account, setAccount] = useState({ name: '', surname: '', email: '', password: '', repeatedPassword: '', state: 'Acre' });
  // Estado para gerenciar os alertas de preenchimento
  const [validInput, setValidInput] = useState({ name: false, surname: false, email: false, password: false, repeatedPassword: false });
  // Estado para notificar o que falta ser preenchido dos inputs
  const [inputHints, setHints] = useState(
    {
      name: 'Seu nome precisa ter mais de 3 caracteres',
      surname: 'Seu sobrenome precisa ter mais de 3 caracteres',
      email: 'Seu email precisa ser válido',
      password: 'Sua senha precisa de:\n  Pelo menos 1 letra maiúscula\n  Pelo menos 1 caractere especial\n  Pelo menos 8 caracteres e no máximo 16',
      repeatedPassword: 'Sua senha precisa estar idêntica nos 2 campos'
    });

  const [buttonToggle, setButtonToggle] = useState(true);
  const [createSuccesfull, setCreateSuccesfull] = useState(false);
  // Redux
  const locationsRedux = useSelector((state) => state.locationsApi);
  const dispatch = useDispatch();
  // Validações
  const emailRegex = /^[a-z0-9.-_]+@[a-z0-9.-]+\.[a-z]+$/i;
  const specialCharsRegex = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;
  const numberRegex = /[^0-9]/;
  // Número de criptografagens
  const saltRounds = 10;

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

  const hashPassword = async (password: string): Promise<string> => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw new Error('Falha ao encriptar a senha');
    }
  };

  const submitAccount = async (): Promise<void> => {
    try {
      let region: string | undefined = locationsRedux.states.find((state) => state.nome === account.state)?.regiao.nome;
      if (region === undefined) region = '';
      const password = await hashPassword(account.password);
      const bodyData: ICreateAccount = {
        name: account.name,
        surname: account.surname,
        email: account.email,
        password,
        state: account.state,
        region
      };
      const { token } = await createAccount(bodyData);

      setToken(token);

      localStorage.setItem('token', token);
      localStorage.setItem('role', 'User');

      setCreateSuccesfull(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const tokenExists = localStorage.getItem('token');
    if (tokenExists !== undefined) return <Navigate to="/main" />;
    const fetch = async (): Promise<void> => {
      const apiStates = await locations.getStatesApi();
      if (apiStates.length > 0) dispatch(actionFillStates(apiStates));
    };
    fetch();
  }, []);

  // Depois que criada a conta é feito o redirecionamento para a página Home
  if (createSuccesfull) return <Navigate to="/main" />;

  return (
    <div>
      <label htmlFor="name">Nome:
        <input
          type="text"
          name="name"
          id="name"
          onChange={({ target }) => { onChangeInput(target); }}
          value={account.name} />
        {validInput.name ? <FiCheck /> : <FiAlertTriangle title={inputHints.name} />}
      </label>

      <label htmlFor="surname">Sobrenome:</label>
      <input
        type="text"
        name="surname"
        id="surname"
        onChange={({ target }) => { onChangeInput(target); }}
        value={account.surname} />
      {validInput.surname ? <FiCheck /> : <FiAlertTriangle title={inputHints.surname} />}
      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        name="email"
        id="email"
        onChange={({ target }) => { onChangeInput(target); }}
        value={account.email} />
      {validInput.email ? <FiCheck /> : <FiAlertTriangle title={inputHints.email} />}

      <label htmlFor="password">Insira sua senha:</label>
      <input
        type="password"
        name="password"
        id="password"
        onChange={({ target }) => { onChangeInput(target); }} />
      {validInput.password ? <FiCheck /> : <FiAlertTriangle title={inputHints.password} />}

      <label htmlFor="repeat-password">Repita a sua senha:</label>
      <input
        type="password"
        name="repeatedPassword"
        id="repeatedPassword"
        onChange={({ target }) => { onChangeInput(target); }} />
      {validInput.repeatedPassword ? <FiCheck /> : <FiAlertTriangle title={inputHints.repeatedPassword} />}

      <select name="state" id="state" onChange={({ target }) => { onChangeInput(target); }} value={account.state}>
        <option key="0" >{locationsRedux.states !== undefined ? 'Selecione' : 'Carregando...'}</option>
        {locationsRedux.states.map((state: ILocations, index: number) => (
          <option key={index + 1} value={state.nome}>{state.nome}</option>))}
      </select>

      <input type="button" name="submit-button" id="submit-button" value="Enviar" disabled={buttonToggle} onClick={submitAccount} />
    </div>
  );
}

export default CreateAccount;
