import { createContext, useEffect, useState } from "react";
import { variables } from "../Variables";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleLoginInputChange = (e, nameValue = null, valueValue = null) => {
    const name = nameValue || e?.target.name;
    const value = valueValue || e?.target.value;

    if (!name) return;

    const nameParts = name.split(".");
    if (nameParts.length > 1) {
      setLoginForm((prevState) => {
        const newLoginForm = { ...prevState };
        let current = newLoginForm;

        for (let i = 0; i < nameParts.length - 1; i++) {
          current = current[nameParts[i]];
        }
        current[nameParts[nameParts.length - 1]] = value;
        return newLoginForm;
      });
    } else {
      setLoginForm({
        ...loginForm,
        [name]: value,
      });
    }
  };

  const login = async (remeberMe) => {
    const loginUrl = `${variables.hostingerURl}/auth/login`;
    try {
      const response = await axios.post(loginUrl, loginForm);
      const token = await response.data.token;
      setAuthToken(token);

      if (remeberMe) {
        Cookies.set("authToken", token, { expires: 7 });
      } else {
        Cookies.set("authToken", token);
      }

      if (response.status === 200) {
        window.location.href = "/search";
      }

      return response;
    } catch (error) {
      alert("Erro no login! Verifique seu email ou senha e tente novamente.");
    }
  };

  const logout = () => {
    setAuthToken(null);
    Cookies.remove("authToken");
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
