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
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [loadingSuccessfull, setLoadingSuccess] = useState(false);

  const numberRegex = /[^0-9]/;
  const emailRegex = /^[a-z0-9.-_]+@[a-z0-9.-]+\.[a-z]+$/i;
  const specialCharsRegex = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;

  const onChangeInput = ({ name, value }: { name: string, value: string }): void => {
    setLogin({ ...login, [name]: value });
    validateInputs(name, value);
  };

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

  const accountLogin = async (): Promise<void> => {
    // Precisa capturar Role e 'Fail' no retorno, ajustar no backend
    // Ajustar para pegar pelo token
    const { email, password } = login;
    const { token, fail } = await requestLogin({ email, password });
    if (fail === 'email') setLoginStatus('Usuário não encontrado, esse é o email correto?');
    if (fail === 'password') setLoginStatus('Senha incorreta!');
    setToken(token);
    saveLocalStorage('token', token);
    setLoginStatus('Login efetuado, aguarde!');
    if (fail === null) setLoadingLogin(true);
  };

  // Redirecionamento para a page CreateAccount
  if (navCreateAcc) return <Navigate to="/create-account" />;
  // Timeout para carregar as variáveis do usuário corretamente
  if (loadingLogin) setTimeout(() => { setLoadingSuccess(true); }, 3000);
  // Redirecionamento para a page Main após Login efetuado
  if (loadingSuccessfull) return <Navigate to="/main" />;

  return (
    <div>
      <h2>Faça o Login</h2>
      {loginStatus.length >= 1 ? <h2>{loginStatus}</h2> : null}
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
      {/* ENTRAR */}
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
