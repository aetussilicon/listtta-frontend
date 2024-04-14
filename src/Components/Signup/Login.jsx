import { useEffect, useState } from "react";
import { variables } from "../../Variables";

import '../../Styles/Components/LoginRegister/Login.css';

export default function Login(props) {
    const [showLogin, setShowLogin] = useState('none');

    return (props.trigger) ? (
        <div className="login-container">
            <div className="login-popup">
                <button className="login-close-button" onClick={() => setTrigger(false)}><img src={variables.closeMenu}></img></button>
                <div className="login-signup-container">
                    <div className="login-banner">
                        <img src={variables.loginBanner} alt="" />
                    </div>
                    <div className="login-fields">
                        <div className="login-top">
                            <p>Criar uma nova conta</p>
                            <p>Já tem uma conta? <a href="#">Entrar</a></p>
                        </div>
                        <div className="login-buttons">
                            <button><img src="Assets/icons/social-networks/google.png" />Continuar com o Google</button>
                            <button><img src="Assets/icons/social-networks/email.png" />Continuar com o e-mail</button>
                            <div className="login-breaker">
                                <p>ou</p>
                            </div>
                            <div className="other-methods">
                                <button><img src="Assets/icons/social-networks/apple.png" />Apple</button>
                                <button><img src="Assets/icons/social-networks/facebook.png" />Facebook</button>
                            </div>
                        </div>
                        <div className="listtta-terms">
                            <p>
                                Ao inscrever-se, você concorda com os <a href="#">Termos de Serviço</a> do Listtta
                                e aceita receber nossos e-mails ocasionalmente. Leia nossa <a href="#">Política de Privacidade</a>
                                para saber como usamos seus dados pessoais.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}