import React, { useState } from 'react';
import { saveLocalStorage } from '../helpers/storage';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { Navigate } from 'react-router-dom';
import { requestLogin, setToken } from '../helpers/connection';

function Login(): React.ReactElement {
  const [login, setLogin] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState({ valid: true, hint: '' });
  const [passwordError, setPasswordError] = useState({ valid: false, hint: '' });
  const [navCreateAcc, setNav] = useState(false);
  const [loginStatus, setLoginStatus] = useState('');
  const [loadingSuccessfull, setLoadingSuccess] = useState(false);

  const numberRegex = /[^0-9]/;
  const emailRegex = /^[a-z0-9.-_]+@[a-z0-9.-]+\.[a-z]+$/i;
  const specialCharsRegex = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;

  /**
   * Captura os nomes e valores dos inputs enquanto são preenchidos, realizando verificações de regras de negócio
   * e liberação da criação de conta quando preenchido corretamente.
   * @param target - Target do DOM
   * @returns void
   */
  const onChangeInput = ({ name, value }: { name: string, value: string }): void => {
    setLogin({ ...login, [name]: value });
    validateInputs(name, value);
  };

  /**
   * Função que realiza as verificações dos inputs para respeitar regras de negócio.
   * Facilitando o login do usuário.
   * @param name - Nome do input
   * @param value - Valor do input
   * @returns void
   */
  const validateInputs = (name: string, value: string): void => {
    switch (name) {
      case 'email':
        value.length > 5 && emailRegex.test(value)
          ? setEmailError({ valid: true, hint: '' })
          : setEmailError({ valid: false, hint: 'E-mail inválido. Certifique-se de que contém "@" e ".com".' });
        break;
      case 'password':
        (value.length >= 8 && value.length <= 16) && specialCharsRegex.test(value) && numberRegex.test(value)
          ? setPasswordError({ valid: true, hint: '' })
          : setPasswordError({ valid: false, hint: 'A senha deve conter pelo menos 8 caracteres, máximo de 16, 1 letra maiúscula, 1 caractere especial e 1 caractere numérico.' });
        break;
      default:
        break;
    }
  };

  /**
   * Função que realiza o login do usuário.
   * Gerencia o token e a resposta da api.
   * @returns Promise void
   */
  const accountLogin = async (): Promise<void> => {
    const { email, password } = login;
    const response = await requestLogin({ email, password })
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error.response.data;
      });
    switch (response.fail) {
      case 'email':
        setLoginStatus('Usuário não encontrado, esse é o email correto?');
        break;
      case 'password':
        setLoginStatus('Senha incorreta!');
        break;
      default:
        setLoginStatus('Login efetuado, aguarde!');
        setToken(response.token);
        saveLocalStorage('token', response.token);
        setEmailError({ valid: false, hint: '' });
        setLoadingSuccess(true);
        break;
    }
  };

  // Redirecionamento para a page CreateAccount
  if (navCreateAcc) return <Navigate to="/create-account" />;
  // Redirecionamento para a page Main após Login efetuado
  if (loadingSuccessfull) return <Navigate to="/main" />;

  return (
    <div>
      <h2>Faça o Login</h2>
      {loginStatus.length >= 1 ? <h3>{loginStatus}</h3> : null}
      {/* INPUT EMAIL */}
      <label htmlFor="email">E-mail: </label>
      <input
        type="email"
        id="email"
        name="email"
        value={login.email}
        onChange={({ target }) => { onChangeInput(target); }}
        data-testid="email-input"
      />
      {
        login.email.length >= 1
          ? emailError.valid
            ? <FiCheck />
            : <FiAlertTriangle title={emailError.hint} />
          : null
      }
      <br />
      {/* INPUT PASSWORD */}
      <label htmlFor="password">Senha: </label>
      <input
        type="password"
        id="password"
        name="password"
        value={login.password}
        onChange={({ target }) => { onChangeInput(target); }}
        data-testid="password-input"
      />
      {
        login.password.length >= 1
          ? passwordError.valid
            ? <FiCheck />
            : <FiAlertTriangle title={emailError.hint} />
          : null
      }
      <br />
      {/* EFETUAR LOGIN */}
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={!(emailError.valid && passwordError.valid)}
        onClick={accountLogin}>
        Entrar
      </button>
      {/* CRIAR CONTA */}
      <button
        type="button"
        data-testid="create-account-submit-btn"
        onClick={() => { setNav(true); }}>
        Criar Conta
      </button>
    </div >
  );
}

export default Login;
