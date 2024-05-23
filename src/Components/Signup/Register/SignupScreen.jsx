import '../../../Styles/Components/LoginRegister/Login.css';
import { variables } from '../../../Variables';

export default function SignupScreen(props) {
    return(props.trigger) ? (
        <div className="login-container">
            <div className="login-popup">
            <button className="login-close-button" onClick={() => props.setTrigger(false)}><img
                    src={variables.closeMenu}></img></button>
            </div>
        </div>
    ) : "";
        
}