import '../../../Styles/Components/LoginRegister/Login.css';
import {useState} from "react";
import {variables} from "../../../Variables.jsx";

export default function Login(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginForm = {
        email : email,
        password: password
    }

    return (props.trigger) ? (
        <div className="login-popup" id="login-screen">
            <button className="login-close-button" onClick={() => props.setTrigger(false)}><img
                src={variables.closeMenu}></img>
                </button>
        </div>
    ) : "";
}