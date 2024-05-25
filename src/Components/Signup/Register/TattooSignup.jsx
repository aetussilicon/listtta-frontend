import "../../../Styles/Components/Auth/SignupScreen.css";
import "../../../Styles/Components/Auth/Login.css";
import { useContext, useDebugValue, useEffect, useState } from "react";
import { SignupFormContext } from "../../../Contexts/SignupLoginFormContext";

export default function TattooSignup(props) {
  const { signupFormData, handleInputChange, signupUser } =
    useContext(SignupFormContext);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signupUser();
  };

  useEffect(() => {
    console.log(signupFormData);
  }, [handleInputChange])

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
            <form onSubmit={handleSignupSubmit}>
              <div className="login-fields">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="default-input signup-screen-input"
                  placeholder="john@gmail.com"
                  value={signupFormData.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="login-fields">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="default-input signup-screen-input"
                  placeholder="**********"
                  value={signupFormData.password}
                  name="password"
                  onChange={handleInputChange}
                />
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
