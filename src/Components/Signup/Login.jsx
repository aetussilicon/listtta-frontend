import { useEffect, useState } from "react";
import { variables } from "../../Variables";

import '../../Styles/Components/LoginRegister/Login.css';

export default function Login(props) {
    const [showLogin, setShowLogin] = useState('none');
    const [showUserTypeSelection, setUserTypeSelection] = useState(false);

    function menuClick() {
        const menu = document.getElementById('login-signup-hidden');
        const type = document.getElementById('login-type-hidden')
        if (menu.style.display == 'block') {
            menu.style.display = 'none';
            type.style.display = 'block';
        } else {
            menu.style.display = 'block';
            type.style.display = 'none';
        }
    }

    return (props.trigger) ? (
        <div className="login-container">
            <div className="login-popup" id="login-signup-hidden">
                <button className="login-close-button" onClick={() => props.setTrigger(false)}><img src={variables.closeMenu}></img></button>
                <div className="login-signup-container" >
                    <div className="login-banner">
                        <img src={variables.loginBanner} alt="" />
                    </div>
                    <div className="login-fields">
                        <div className="login-top">
                            <p>Criar uma nova conta</p>
                            <span>Já tem uma conta? <a href="#">Entrar</a></span>
                        </div>
                        <div className="login-buttons">
                            <button><img src="Assets/icons/social-networks/google.png" />Continuar com o Google</button>
                            <button onClick={menuClick}><img src="Assets/icons/social-networks/email.png" />Continuar com o e-mail</button>
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
                                e aceita receber nossos e-mails ocasionalmente. Leia nossa <a href="#">Política de Privacidade</a> para saber como usamos seus dados pessoais.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="login-popup" id="login-type-hidden">
                <button className="login-close-button" onClick={() => props.setTrigger(false)}><img src={variables.closeMenu}></img></button>
                <div className="login-signup-container user-chosser-container">
                    <div className="who-you-are">
                        <h1>Você é?</h1>
                        <div className="who-you-are-block-one">
                            <div className="who-block">
                                <div className="who-block-content">
                                    <img src="Assets/icons/accounts/tattoo.png" alt="Tattoo" />
                                    <span><a href="/signup/tattoo">Tatuador</a></span>
                                </div>
                            </div>
                            <div className="who-block">
                                <div className="who-block-content">
                                    <img src="Assets/icons/accounts/ear.png" alt="Piercer" />
                                    <span><a href="/signup/piercer">Piercer</a></span>
                                </div>
                            </div>
                        </div>
                        <div className="who-you-are-block-two">
                            <div className="who-block block-two">
                                <div className="who-block-content">
                                    <img className="block-two-img" src="Assets/icons/accounts/customer.png" alt="Customer" />
                                    <span><a href="/signup/user">Cliente</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : "";
}