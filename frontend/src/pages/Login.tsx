import React, { useState } from 'react';
import { saveLocalStorage } from '../helpers/storage';
import { FiCheck, FiAlertTriangle } from 'react-icons/fi';
import { Navigate } from 'react-router-dom';
import { requestLogin, setToken } from '../helpers/connection';

function Login(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [login, setLogin] = useState({ email: '', password: '' });
  const [emailError, setEmailError] = useState({ invalid: true, hint: '' });
  const [passwordError, setPasswordError] = useState({ invalid: true, hint: '' });
  const [navCreateAcc, setNav] = useState(false);
  const [loginSuccessfull, setLoginSuccess] = useState(false);

  const numberRegex = /[^0-9]/;
  const emailRegex = /^[a-z0-9.-_]+@[a-z0-9.-]+\.[a-z]+$/i;
  const specialCharsRegex = /[`!@#$%^&*()_+=[\]{};':"\\|,.<>/?~]/;

  const validateEmail = (emailInput: string): void => {
    const isValidEmail = emailInput.length > 5 && emailRegex.test(emailInput);

    if (!isValidEmail) {
      setEmailError({ invalid: true, hint: 'E-mail inválido. Certifique-se de que contém "@" e ".com".' });
    } else {
      setEmailError({ invalid: false, hint: '' });
    }
  };

  const validatePassword = (password: string): void => {
    const isValidPassword = password.length >= 8 && password.length <= 16 && specialCharsRegex.test(password) && numberRegex.test(password);

    if (!isValidPassword) {
      setPasswordError({ invalid: true, hint: 'A senha deve conter pelo menos 8 caracteres, máximo de 16, 1 letra maiúscula, 1 caractere especial e 1 caractere numérico.' });
    } else {
      setPasswordError({ invalid: false, hint: '' });
    }
  };

  // const onChangeInput = ({ name, value }: { name: string, value: string }): void => {
  //   setLogin({ ...login, [name]: value });
  //   validateInputs(name, value);
  // };

  // const validateInputs = (name: string, value: string): void => {
  //   switch (name) {
  //     case 'email':
  //       value.length > 5 && emailRegex.test(value)
  //         ? setEmailError({ invalid: true, hint: 'E-mail inválido. Certifique-se de que contém "@" e ".com".' })
  //         : setEmailError({ invalid: false, hint: '' });
  //       break;
  //     case 'password':
  //       value.length >= 8 && password.length <= 16 && specialCharsRegex.test(value) && numberRegex.test(value)
  //         ? setPasswordError({ invalid: true, hint: 'A senha deve conter pelo menos 8 caracteres, máximo de 16, 1 letra maiúscula, 1 caractere especial e 1 caractere numérico.' })
  //         : setPasswordError({ invalid: false, hint: '' });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleEmailChange = ({ value }: { value: string }): void => {
    const emailInput = value;
    setEmail(emailInput);
    validateEmail(emailInput);
  };

  const handlePasswordChange = ({ value }: { value: string }): void => {
    const newPassword = value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const accountLogin = async (): Promise<void> => {
    try {
      const { token } = await requestLogin({ email, password });
      setToken(token);
      saveLocalStorage('token', token);
      setLoginSuccess(true);
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  if (navCreateAcc) return <Navigate to="/create-account" />;
  if (loginSuccessfull) return <Navigate to="/main" />;

  return (
    <div>
      <h2>Tela de Login</h2>
      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={({ target }) => { handleEmailChange(target); }}
        data-testid="email-input"
        required
      />
      {
        email.length > 1
          ? emailError.invalid
            ? <FiAlertTriangle title={emailError.hint} />
            : <FiCheck />
          : null
      }
      <br />
      <label htmlFor="password">Senha:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={({ target }) => { handlePasswordChange(target); }}
        data-testid="password-input"
        required
      />
      {
        password.length > 1
          ? passwordError.invalid
            ? <FiAlertTriangle title={emailError.hint} />
            : <FiCheck />
          : null
      }
      <br />
      {/* ENTRAR */}
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={emailError.invalid && passwordError.invalid}
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
