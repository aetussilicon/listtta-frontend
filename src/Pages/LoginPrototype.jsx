import { useState } from 'react';
import Header from '../Components/Header/Header';
import '../Styles/TestePage.css';
import Footer from '../Components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

export default function LoginPrototype() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginData = {
    email,
    password,
  };

  const navigate = useNavigate();
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        'https://listtta-backend.lryftz.easypanel.host/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(loginData),
        }
      );
      if (!response.ok) {
        throw new Error('Erro ao efetuar o login');
      }
      const tokenData = await response.json();
      const token = tokenData.token;
      localStorage.setItem('user_token', `Bearer ${token}`);
      // console.log("Signup bem sucedido");
      navigate('/search');
    } catch (error) {
      console.error('Erro no Signup: ' + error.message);
      alert('Erro no login');
    }
  };

  return (
    <>
      <Header />
      <div className='container login-page-container'>
        <div className='login-area'>
          <div className='login-form'>
            <form onSubmit={handleLogin}>
              <div className='login-data-input'>
                <label htmlFor='email'>Email:</label>
                <input
                  type='email'
                  id='email'
                  placeholder='john@gmail.com'
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className='login-data-input'>
                <label htmlFor='password'>Senha:</label>
                <input
                  type='password'
                  id='password'
                  placeholder='sua senha'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <div className='breaker' />
              <button
                className='btn'
                type='submit'>
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
