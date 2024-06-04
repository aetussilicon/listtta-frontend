import { useState } from "react";
import "../../Styles/Components/Header/Header.css";
import SigninScreen from "../Signup/SigninScreen.jsx";
import Login from "../Signup/Login/Login.jsx";

export default function HomeHeader() {
  const [signinScreen, setSigninScreen] = useState(false);
  const [loginScreen, setLoginScreen] = useState(false);

  function menuClick() {
    const menu = document.getElementById("menu-to-display");
    if (menu.style.display == "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }

  return (
    <>
      <header>
        <nav>
          <div className="container header-container">
            <div className="header-right-side">
              <div className="header-top-line">
                <a href="/">
                  <img
                    src="/Assets/icons/logo/colorful-logo.png"
                    alt="Listtta-logo"
                  />
                </a>
                <span onClick={menuClick} className="material-symbols-outlined x-menu">
                  menu
                </span>
              </div>
              <div id="menu-to-display" className="nav-links">
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/how-it-works">Como funciona?</a>
                  </li>
                  <li>
                    <a href="/contact">Contato</a>
                  </li>
                  <li>
                    <a href="https://blog.listtta.com.br">Blog</a>
                  </li>
                </ul>
                <div
                  id="menu-to-display"
                  className="nav-register menu-buttons hidden-inverse"
                >
                  <button className="button" onClick={() => setLoginScreen(true)}>login</button>
                  <a onClick={() => setSigninScreen(true)}>Cadastre-se</a>
                </div>
              </div>
              <div className="nav-register hidden">
                <button onClick={() => setLoginScreen(true)}>
                  <a>Login</a>
                </button>
                <a onClick={() => setSigninScreen(true)}>Cadastre-se</a>
              </div>
            </div>
          </div>
        </nav>
        {signinScreen && (
          <SigninScreen trigger={signinScreen} setTrigger={setSigninScreen} />
        )}
        {loginScreen && (
          <Login trigger={loginScreen} setTrigger={setLoginScreen} />
        )}
      </header>
    </>
  );
}
