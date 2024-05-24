import { useState } from "react";
import "../../../Styles/Components/Auth/SignupScreen.css";
import { variables } from "../../../Variables";
import Login from "../Login/Login";

export default function SignupScreen(props) {
  const [currentScreen, setCurrentScreen] = useState("main");

  function closeSignupScreen() {
    props.setTrigger(false);
    setCurrentScreen("main");
  }

  // function menuClickLogin() {
  //     setLoginPopup(true);

  //     const menu = document.getElementById("signup-screen");
  //     const login = document.getElementById("login-screen");

  //     if(menu.style.display === "block" || menu.style.display === "") {
  //         menu.style.display = "none";
  //         login.style.display = "block";
  //     } else {
  //         menu.style.display = "block";
  //         login.style.display = "none";
  //     }
  // }

  return props.trigger ? (
    <>
      {currentScreen === "main" && (
        <div className="login-container" id="signup-screen">
          <div className="login-popup">
            <button
              className="login-close-button"
              onClick={closeSignupScreen}
            >
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
                    <button onClick={() => setCurrentScreen("login")}>Entrar</button>
                  </span>
                  {/*Adicionar tela de login */}
                </div>
                <div className="login-buttons">
                  <button>
                    <img src="Assets/icons/social-networks/google.png" />
                    Continuar com o Google
                  </button>
                  <button>
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
    </>
  ) : (
    ""
  );
}
