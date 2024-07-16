import { createContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Api from '../Api.jsx';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleLoginInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      setLoginForm((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else {
      setLoginForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const login = async () => {
    try {
      const response = await Api.post('/auth/login', loginForm);
      const token = await response.data.token;
      setAuthToken(token);

      if (loginForm.rememberMe) {
        Cookies.set('authToken', token, { expires: 7 });
      } else {
        sessionStorage.set('authToken', token);
      }

      if (response.status === 200) {
        window.location.href = '/search';
      }

      return response;
    } catch (error) {
      alert('Erro no login! Verifique seu email ou senha e tente novamente.');
    }
  };

  const logout = () => {
    setAuthToken(null);
    if (Cookies.get('authToke')) {
      Cookies.remove('authToken');
    } else if (sessionStorage.getItem('authToken')) {
      sessionStorage.removeItem('authToken');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loginForm,
        setLoginForm,
        authToken,
        login,
        logout,
        handleLoginInputChange,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
