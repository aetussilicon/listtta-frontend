import { useContext, useEffect, useState } from "react";
import "../../../Styles/Components/Auth/SignupScreen.css";
import { variables } from "../../../Variables";
import Login from "../Login/Login";
import UserTypeSelectionScreen from "./UserTypeSelectionScreen";
import TattooSignup from "./TattooSignup";
import { SignupFormContext } from "../../../Contexts/SignupLoginFormContext";

export default function SignupScreen(props) {
  const [currentScreen, setCurrentScreen] = useState("main");
  const { signupFormData } = useContext(SignupFormContext);

  function closeSignupScreen() {
    props.setTrigger(false);
    setCurrentScreen("main");
  }

  useEffect(() => {
    if (signupFormData.role === "TATTOO") {
      setCurrentScreen("tattoo");
    } else if (signupFormData.role === "PIERCER") {
      setCurrentScreen("piercer");
    } else if (signupFormData.role === "USER") {
      setCurrentScreen("user");
    }
  }, [signupFormData.role]);

  return props.trigger ? (
    <>
      {currentScreen === "main" && (
        <div className="login-container" id="signup-screen">
          <div className="login-popup">
            <button className="login-close-button" onClick={closeSignupScreen}>
              <img src={variables.closeMenu}></img>
            </button>
            <div className="signup-screen-container">
              <div className="login-banner">
                <img src={variables.loginBanner} alt="" />
              </div>
              <div className="login-fields">
                <div className="login-top">
                  <p>Criar uma nova conta</p>
                  <span>
                    Já tem uma conta?
                    <a onClick={() => setCurrentScreen("login")}> Entrar</a>
                  </span>
                  {/*Adicionar tela de login */}
                </div>
                <div className="login-buttons">
                  <button>
                    <img src="Assets/icons/social-networks/google.png" />
                    Continuar com o Google
                  </button>
                  <button onClick={() => setCurrentScreen("email")}>
                    <img src="Assets/icons/social-networks/email.png" />
                    Continuar com o e-mail
                  </button>
                  <div className="login-breaker">
                    <p>ou</p>
                  </div>
                  <div className="other-methods">
                    <button>
                      <img src="Assets/icons/social-networks/apple.png" />
                      Apple
                    </button>
                    <button>
                      <img src="Assets/icons/social-networks/facebook.png" />
                      Facebook
                    </button>
                  </div>
                  <div className="listtta-terms">
                    <p>
                      Ao inscrever-se, você concorda com os{" "}
                      <a href="#">Termos de Serviço</a> do Listtta e aceita
                      receber nossos e-mails ocasionalmente. Leia nossa{" "}
                      <a href="#">Política de Privacidade</a> para saber como
                      usamos seus dados pessoais.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentScreen === "login" && (
        <Login trigger={true} setTrigger={() => setCurrentScreen("main")} />
      )}
      {currentScreen === "email" && (
        <UserTypeSelectionScreen
          trigger={true}
          setTrigger={() => setCurrentScreen("main")}
        />
      )}
      {currentScreen === "tattoo" && (
        <TattooSignup trigger={true} setTrigger={() => setCurrentScreen("main")} />
      )}
    </>
  ) : (
    ""
  );
}
