import { useState } from "react";
import "../../../Styles/Components/Auth/SignupScreen.css";
import "../../../Styles/Components/Auth/Login.css";
// import {useState} from "react";
import { variables } from "../../../Variables.jsx";
import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

    const loginPayload = {
        email,
        password
    }

  async function loginUser() {
    const loginUrl = `${variables.localhost}/auth/login`;

    try {
        const response = await axios.post(loginUrl, loginPayload);
        const data = await response.data
        console.log(data);
    } catch (error) {
        console.error(error);
    }
  }

  return props.trigger ? (
    <div className="login-container">
      <div className="login-popup" id="login-screen">
        <button
          className="login-close-button"
          onClick={() => props.setTrigger(false)}
        >
          <span className="material-symbols-outlined arrow-span">arrow_back</span>
        </button>
        <div className=" signup-screen-container login-screen-container">
          <div className="login-form">
            <form onSubmit={(e) => loginUser(e)}>
              <div className="login-fields">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="default-input signup-screen-input"
                  placeholder="john@gmail.com"
                  value={email}
                  name="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="login-fields">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="default-input signup-screen-input"
                  placeholder="**********"
                  value={password}
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <button type="submit" className="btn">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
