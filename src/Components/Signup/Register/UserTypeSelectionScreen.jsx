// import "../../../Styles/Components/Auth/Login.css";
import "../../../Styles/Components/Auth/SignupScreen.css";
import "../../../Styles/Components/Auth/UserTypeSelectionScreen.css";

export default function UserTypeSelectionScreen(props) {
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
              <button className="user-type-button">
                <img src="Assets/icons/accounts/tattoo.png" alt="Cliente" />
                <span className="default-span user-type-span">Tatuador</span>
              </button>
              <button className="user-type-button">
                <img src="Assets/icons/accounts/piercer.png" alt="Cliente" />
                <span className="default-span user-type-span">Piercer</span>
              </button>
            </div>
            <div className="user-type-buttons-area-bottom">
              <button className="user-type-button">
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
