import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateEmail(newEmail);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validateEmail = (newEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(newEmail);

    if (!isValidEmail && newEmail.length > 0) {
      setEmailError('E-mail inválido. Certifique-se de que contém "@" e ".com".');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (newPassword: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,16}$/;
    const isValidPassword = passwordRegex.test(newPassword);

    if (!isValidPassword && newPassword.length > 0) {
      setPasswordError('A senha deve conter pelo menos 8 caracteres, máximo de 16, 1 letra maiúscula, 1 caractere especial e 1 caractere numérico.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailError && !passwordError) {
      try {
        const response = await axios.post('url-de-login', {
          email,
          password
        });

        if (response.data.success) {
          alert('Login bem-sucedido!');
        } else {
          alert('Login falhou. Verifique suas credenciais.');
        }
      } catch (error) {
        console.error('Erro ao fazer login:', error);
        alert('Ocorreu um erro ao fazer login. Tente novamente mais tarde.');
      }

      localStorage.setItem('user', JSON.stringify({ email }));
    }
  };

  return (
    <div>
      <h2>Tela de Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" data-testid="login-submit-btn" disabled={!!emailError || !!passwordError}>
          Entrar
        </button>
        <button type="submit" data-testid="create-account-submit-btn">
          Criar Conta
        </button>
      </form>
    </div>
  );
}

export default Login;
