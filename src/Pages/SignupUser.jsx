import { useState } from "react";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import '../Styles/Pages/SignupClient.css'

export default function SignupUser() {

    const role = "USER";

    const [userTag, setUserTag] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const signUpData = {
        userTag,
        email,
        password,
        city,
        state,
        phoneNumber,
        role
    }

    const handleSignupSubmit = async(event) => {
        try {
            const response = await fetch('http://localhost:8080/auth/signup', {
                method: "POST", // or 'PUT'
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(signUpData),
            });
            console.log(signUpData);
            console.log("cadastrado com sucesso: ", response.data);
            alert("Formulário enviado com sucesso!");
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro ao enviar o formulário. Verifique os campos e tente novamente.");
        }
    }

    return (
        <>
            <Header />
            <div className="piercer-register-container container">
                <div className="main-info">
                    <div className="info-blocks">
                        <div className="info-block-container">
                            <div className="first-block">
                                <form action="">
                                    <div className="form-field user-tag-field">
                                        <label htmlFor="userTag">Nome de exibição</label>
                                        <input type="text" className="default-input" placeholder="Nome de exibição" id="userTag" value={userTag} onChange={(e) => setUserTag(e.target.value)} />
                                    </div>
                                    <div className="form-field user-picture">
                                        <input type="file" accept="image/png, image/jpeg" />
                                    </div>
                                    <div className="form-field user-address-fields">
                                        <h3>Local: </h3>
                                        <input type="text" className="default-input" name="city" id="city" placeholder="São Paulo" value={city} onChange={(e) => setCity(e.target.value)} />
                                        <p>/</p>
                                        <input type="text" className="default-input" name="state" id="state" placeholder="SP" value={state} onChange={(e) => setState(e.target.value)} />
                                    </div>
                                </form>
                            </div>
                            <div className="highlight-profile">
                                <button className="btn">Destaque o seu perfil</button>
                            </div>
                        </div>
                        <div className="info-block-container">
                            <div className="second-block">
                                <h1>Contato</h1>
                                <form>
                                    <div className="form-field">
                                        <label htmlFor="phoneNumber">Celular: </label>
                                        <input type="text" className="default-input" placeholder="11000-0000" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)}/>
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="email">E-mail: </label>
                                        <input type="text" className="default-input" placeholder="Seu Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                                    </div>
                                    <div className="form-field">
                                        <label htmlFor="password">Senha: </label>
                                        <input type="password" className="default-input" placeholder="Seu senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                    </div>
                                </form>
                                <div className="breaker"></div>
                                <div className="confirm-terms">
                                    <form>
                                        <div className="form-field">
                                            <input type="checkbox" id="checkbox-confirm-terms" />
                                            <label htmlFor="checkbox-confirm-terms">
                                                Ao inscrever-se, você concorda com os <a href="#">Termos de Serviço</a> do Listtta e aceita
                                                receber nossos e-mails ocasionalmente. Leia nossa <a href="#">Política de Privacidade</a> para
                                                saber como usamos seus dados.
                                            </label>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="submit-profile">
                                <button className="btn" onClick={handleSignupSubmit}>Salvar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}