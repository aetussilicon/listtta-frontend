// import "../../../Styles/Components/Auth/Login.css";
import { useContext, useEffect } from "react";
import "../../../Styles/Components/Auth/SignupScreen.css";
import "../../../Styles/Components/Auth/UserTypeSelectionScreen.css";
import { SignupFormContext } from "../../../Contexts/SignupLoginFormContext";

export default function UserTypeSelectionScreen(props) {
  const { signupFormData, handleInputChange } =
    useContext(SignupFormContext);

  const handleRoleChange = (role) => {
    handleInputChange(null, 'role', role);
  }

  useEffect(() => {
    console.log(signupFormData);
  }, [signupFormData]);

  return props.trigger ? (
    <div className="login-container">
      <div className="login-popup">
        <button
          className="login-close-button"
          onClick={() => {
            props.setTrigger(false);
          }}
        >
          <span className="material-symbols-outlined arrow-span">
            arrow_back
          </span>
        </button>
        <div className="signup-screen-container user-type-selection-screen-container">
          <div className="user-type-buttons-container">
            <div className="user-type-buttons-area-top">
              <button className="user-type-button"  onClick={() => handleRoleChange('TATTOO')} >
                <img src="Assets/icons/accounts/tattoo.png" alt="Tatuador" />
                <span className="default-span user-type-span">Tatuador</span>
              </button>
              <button className="user-type-button" onClick={() => handleRoleChange('PIERCER')}>
                <img src="Assets/icons/accounts/piercer.png" alt="Piercer" />
                <span className="default-span user-type-span">Piercer</span>
              </button>
            </div>
            <div className="user-type-buttons-area-bottom">
              <button className="user-type-button" onClick={() => handleRoleChange('USER')} >
                <img src="Assets/icons/accounts/customer.png" alt="Cliente" />
                <span className="default-span user-type-span">Cliente</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
