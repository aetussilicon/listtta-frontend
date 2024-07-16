import { useContext } from 'react';
import '../../../Styles/Components/Auth/Login.css';
import { AuthContext } from '../../../Contexts/AuthContext.jsx';

export default function Login(props) {
  const { loginForm, login, handleLoginInputChange } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return props.trigger ? (
    <div className='login-container signin-container'>
      <div className='signin-popup'>
        <button
          className='signin-close-button'
          onClick={() => props.setTrigger(false)}>
          <span className='material-symbols-outlined arrow-span'>
            arrow_back
          </span>
        </button>
        <div className='signin-screen-container signup-screen-container'>
          <div className='signup-form'>
            <form onSubmit={handleLoginSubmit}>
              <div className='signup-fields'>
                <label
                  htmlFor='email'
                  className='signup-input-labels'>
                  Email
                </label>
                <input
                  type='email'
                  className='default-input signup-input'
                  placeholder='john@gmail.com'
                  value={loginForm.email}
                  name='email'
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className='signup-fields'>
                <label
                  htmlFor='password'
                  className='signup-input-labels'>
                  Senha
                </label>
                <input
                  type='password'
                  className='default-input signup-input'
                  placeholder='**********'
                  value={loginForm.password}
                  name='password'
                  onChange={handleLoginInputChange}
                />
              </div>
              <div className='signup-fields'>
                <input
                  name='rememberMe'
                  type='checkbox'
                  checked={loginForm.rememberMe}
                  onChange={handleLoginInputChange}
                />
                <label htmlFor='rememberMe'>Lembrar de mim</label>
              </div>
              <button
                type='submit'
                className='btn'>
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ''
  );
}
