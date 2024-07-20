import { useContext, useEffect, useState } from 'react';
import '../../Styles/Components/Auth/SigninScreen.css';
import { variables } from '../../Variables';
import Login from './Login/Login';
import UserTypeSelectionScreen from './Register/UserTypeSelectionScreen';
import { SignupFormContext } from '../../Contexts/SignupLoginFormContext';
import SignupScreen from './Register/SignupScreen';
import Api from '../../Api';

export default function SigninScreen(props) {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [authToken, setAuthToken] = useState(null);
  const { signupFormData } = useContext(SignupFormContext);

  const googleRedirectUri = import.meta.env.VITE_GOOGLE_REDIRECT_URI;
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  function closeSignupScreen() {
    props.setTrigger(false);
    setCurrentScreen('main');
  }

  useEffect(() => {
    if (signupFormData.professionalsDto.type === 'TATTOO') {
      setCurrentScreen('tattoo');
    } else if (signupFormData.professionalsDto.type === 'PIERCER') {
      setCurrentScreen('piercer');
    } else if (signupFormData.role === 'USER') {
      setCurrentScreen('user');
    }
  }, [signupFormData.role]);

  const handleGoogleAuth = () => {
    const googleAuthUrl =
      'https://accounts.google.com/o/oauth2/v2/auth?' +
      `redirect_uri=${googleRedirectUri}` +
      '&response_type=code' +
      `&client_id=${googleClientId}` +
      '+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile' +
      '+openid&access_type=offline';
    window.location.href = googleAuthUrl;
  };

  const handleAuthCode = async () => {
    if (!authToken) return;

    try {
      const response = await Api.get(`${googleRedirectUri}?code=${authToken}`);

      if (response.status === 201) {
        alert('Cadastrado com sucesso!');
      } else {
        throw new Error('Erro ao autenticar com o Google');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setAuthToken(code);
      handleAuthCode();
    }
  }, []);

  return props.trigger ? (
    <>
      {currentScreen === 'main' && (
        <div className='signin-container'>
          <div className='signin-popup'>
            <button
              className='signin-close-button'
              onClick={closeSignupScreen}>
              <img src={variables.closeMenu}></img>
            </button>
            <div className='signin-screen-container'>
              <div className='signin-banner'>
                <img
                  src={variables.loginBanner}
                  alt=''
                />
              </div>
              <div className='signin-fields'>
                <div className='signin-top'>
                  <p>Criar uma nova conta</p>
                  <span>
                    Já tem uma conta?
                    <a onClick={() => setCurrentScreen('login')}> Entrar</a>
                  </span>
                  {/*Adicionar tela de login */}
                </div>
                <div className='signin-buttons'>
                  <button onClick={handleGoogleAuth}>
                    <div className='account-img-button'>
                      <img src='Assets/icons/social-networks/google.png' />
                    </div>
                    Continuar com o Google
                  </button>
                  <button onClick={() => setCurrentScreen('email')}>
                    <div className='account-img-button'>
                      <img src='Assets/icons/social-networks/email.png' />
                    </div>
                    Continuar com o e-mail
                  </button>
                  <div className='signin-breaker'>
                    <p>ou</p>
                  </div>
                  <div className='other-signin-methods'>
                    <button>
                      <div className='account-img-button other-signin-methods-buttons'>
                        <img src='Assets/icons/social-networks/apple.png' />
                      </div>
                      Apple
                    </button>
                    <button>
                      <div className='account-img-button other-signin-methods-buttons'>
                        <img src='Assets/icons/social-networks/facebook.png' />
                      </div>
                      Facebook
                    </button>
                  </div>
                  <div className='listtta-terms'>
                    <p>
                      Ao inscrever-se, você concorda com os{' '}
                      <a href='#'>Termos de Serviço</a> do Listtta e aceita
                      receber nossos e-mails ocasionalmente. Leia nossa{' '}
                      <a href='#'>Política de Privacidade</a> para saber como
                      usamos seus dados pessoais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentScreen === 'login' && (
        <Login
          trigger={true}
          setTrigger={() => setCurrentScreen('main')}
        />
      )}
      {currentScreen === 'email' && (
        <UserTypeSelectionScreen
          trigger={true}
          setTrigger={() => setCurrentScreen('main')}
        />
      )}
      {currentScreen === 'tattoo' && (
        <SignupScreen
          trigger={true}
          setTrigger={() => setCurrentScreen('main')}
        />
      )}
      {currentScreen === 'piercer' && (
        <SignupScreen
          trigger={true}
          setTrigger={() => setCurrentScreen('main')}
        />
      )}
      {currentScreen === 'user' && (
        <SignupScreen
          trigger={true}
          setTrigger={() => setCurrentScreen('main')}
        />
      )}
    </>
  ) : (
    ''
  );
}
