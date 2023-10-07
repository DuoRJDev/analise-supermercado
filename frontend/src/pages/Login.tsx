import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { saveLocalStorage } from '../helpers/storage';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const URL_LOGIN = 'http://localhost:3001/login';

  const validateEmail = (emailInput: string): void => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(emailInput);

    if (!isValidEmail && emailInput.length > 0) {
      setEmailError('E-mail inválido. Certifique-se de que contém "@" e ".com".');
    } else {
      setEmailError('');
    }
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    validateEmail(emailInput);
  };

  const validatePassword = (newPassword: string): void => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,16}$/;
    const isValidPassword = passwordRegex.test(newPassword);

    if (!isValidPassword && newPassword.length > 0) {
      setPasswordError('A senha deve conter pelo menos 8 caracteres, máximo de 16, 1 letra maiúscula, 1 caractere especial e 1 caractere numérico.');
    } else {
      setPasswordError('');
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    try {
      const response = await axios.post(URL_LOGIN, {
        email,
        password
      });
      // Validação de token da resposta necessária e adição do mesmo no header para manter login

      // if (response.data.success) {
      //   alert('Login bem-sucedido!');
      // } else {
      //   alert('Login falhou. Verifique suas credenciais.');
      // }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
    }
    saveLocalStorage('user', email);
    // localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div>
      <h2>Tela de Login</h2>
      <label htmlFor="email">E-mail:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={handleEmailChange}
        data-testid="email-input"
        required
      />
      <br />
      {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
      <label htmlFor="password">Senha:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={handlePasswordChange}
        data-testid="password-input"
        required
      />
      <br />
      {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
      <button
        onClick={handleSubmit}
        data-testid="login-submit-btn"
        disabled={!!emailError || !!passwordError}
      >
        Login
      </button>
      <button
        data-testid="login-submit-btn"
      >
        Criar nova conta
      </button>
    </div>
  );
}

export default Login;
