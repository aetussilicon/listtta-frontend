
import "../../../Styles/Components/Auth/SignupScreen.css";
import "../../../Styles/Components/Auth/Login.css";
import { useState } from "react";

export default function TattooSignup(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  return props.trigger ? (
    <div className="login-container">
      <div className="login-popup">
        <button
          className="login-close-button"
          onClick={() => props.setTrigger(false)}
        >
          <span className="material-symbols-outlined arrow-span">
            arrow_back
          </span>
        </button>
        <div className="signup-screen-container login-screen-container">
          <div className="login-form">
            <form action="">
                <div className="login-fields">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="default-input signup-screen-input" placeholder="john@gmail.com" value={email} name="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </div>
                <div className="login-fields">
                    <label htmlFor="password">Senha</label>
                    <input type="password" className="default-input signup-screen-input" placeholder="**********" value={email} name="email" onChange={(e) => {
                        setEmail(e.target.value)
                    }} />
                </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
