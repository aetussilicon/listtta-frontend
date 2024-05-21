import { useEffect, useState } from "react";
import { variables } from "../../../Variables.jsx";
import { redirect } from "react-router-dom"; 

import '../../../Styles/Components/LoginRegister/Login.css';
import axios from "axios";
import Login from "../Login/Login.jsx";

export default function Signup(props) {
    const [showLogin, setShowLogin] = useState('none');
    const [showUserTypeSelection, setUserTypeSelection] = useState(false);
    const [showLoginScreen, setShowLoginScreen] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);

    //consts do formulário de signup e login
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [type, setType] = useState(null);
    const [instagramUrl, setInstagramUrl] = useState('');
    const [skills, setSkills] = useState('');


    //Dropdowns content
    const [filters, setFilters] = useState([]);
    const [apiStates, setApiStates] = useState(null);
    const [apiCity, setApiCity] = useState([]);
    const [isChecked, setIsChecked] = useState(false);

    const [selectedState, setSelectedState] = useState("Seu estado");
    const [selectedCity, setSelectedCity] = useState("Sua Cidade");

    //URLs
    let baseFiltersUrl = `${variables.localhost}/filters/list/all`;
    let localhostUrl = 'http://localhost:8080';
    let baseStatesUrl = 'https://brasilapi.com.br/api/ibge/uf/v1';
    let baseCitiesUrl = 'https://brasilapi.com.br/api/ibge/municipios/v1/';

    //Reset do formulário
    const resetFormSigup = () => {
        setEmail('');
        setPassword('');
        setRole('');
        setState('');
        setCity('');
        setType(null);
        setInstagramUrl('');
        setSkills('')
    }

    const loginForm = {
        email: email,
        password: password
    }

    //Formuláriio de signup
    const signUpForm = {
        email: email,
        password: password,
        role: role,
        address: {
            state: state,
            city: city
        },
        professionalsDto: {
            type: type,
            instagramUrl: instagramUrl,
            // skills: skills
        }
    }

    //TODO REMOVER CONSOLE.LOG
    console.log(signUpForm);

    function menuClickForUserSelect() {
        const menu = document.getElementById('login-signup-hidden');
        const type = document.getElementById('login-type-hidden');
        const signup = document.getElementById('user-signup');

        // Verifica se o menu está visível
        if (menu.style.display === 'block' || menu.style.display === '') {
            menu.style.display = 'none'; // Oculta o menu
            type.style.display = 'block'; // Exibe a seção type
        } else {
            menu.style.display = 'block'; // Exibe o menu
            type.style.display = 'none'; // Oculta a seção type
            signup.style.display = 'none'; // Garante que a seção signup também seja ocultada
        }
    }

    function menuClickForUserSignup() {
        const type = document.getElementById('login-type-hidden');
        const signup = document.getElementById('user-signup');

        // Verifica se a seção type está visível
        if (type.style.display === 'block') {
            type.style.display = 'none'; // Oculta a seção type
            signup.style.display = 'block'; // Exibe a seção signup
        } else {
            type.style.display = 'block'; // Exibe a seção type
            signup.style.display = 'none'; // Oculta a seção signup
        }
    }

    function loginContainerButton() {
        const menu = document.getElementById('login-signup-hidden');
        const loginContainer = document.getElementById('login-screen');

        if (menu.style.display === 'block') {
            menu.style.display = 'none';
            loginContainer.style.display = 'block';
        } else {
            menu.style.display = 'block';
            loginContainer.style.display = 'none';
        }
    }

    function loginScreenButton() {
        const menu = document.getElementById('login-signup-hidden');
        const loginScreen = document.getElementById('login-screen');

        if (menu.style.display === 'block') {
            menu.style.display = 'none';
            loginScreen.style.display = 'block';
        } else {
            menu.style.display = 'block';
            loginScreen.style.display = 'none';
        }
    }

    useEffect(() => {
        fetchCities();
    }, [state])

    useEffect(() => {
        async function fetchStates() {
            try {
                const response = await fetch(baseStatesUrl);
                const data = await response.json();

                setApiStates(data);
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStates();
    }, [])

    async function fetchCities() {
        try {
            const response = await axios.get(baseCitiesUrl + state + '?providers=dados-abertos-br,gov,wikipedia', {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            setApiCity(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }


    const loginUser = async (e) => {
        e.preventDefault();
      
        const loginUrl = `${variables.localhost}/auth/login`;
      
        try {
          const response = await axios.post(loginUrl, loginForm);
      
          if (response.status === 200) {
            // Redirect to the search page after successful login
            redirect("/search"); // Assuming this is the correct path
            alert("Login realizado com sucesso!");
            console.log(response.data);
          } else {
            alert("Erro no login. Verifique email ou senha.");
          }
        } catch (error) {
          console.error('Erro no login:', error);
        }
      };

    const signupUser = async (e) => {
        e.preventDefault();

        const signupUrl = `${variables.localhost}/auth/signup`;
        // const navigate = Navigate();

        try {
            const response = await axios.post(signupUrl, signUpForm);

            if (response.status === 201) {
                alert("Cadastro com sucesso, você já pode logar");
            } else {
                alert("Não foi possível cadastrar o usuário");
            }

        } catch (error) {
            console.error("Erro no cadastro" + error)
        }
    }

    function openDropdownMenuStates() {
        const dropdown = document.getElementById('dropdownStatesId');
        if (dropdown.style.display === "none" || dropdown.style.display === '') {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }

    function openDropdownMenuCity() {
        const dropdown = document.getElementById('dropdownCityId');
        if (dropdown.style.display === "none" || dropdown.style.display === '') {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleSelectedState = (option) => {
        setSelectedState(option);
    }

    const handleSelectedCity = (option) => {
        setSelectedCity(option);
    }

    const signUpForms = () => {
        if (role === 'USER') {
            return (
                <form id="user-form" onSubmit={(e) => signupUser(e)}>
                    <input className="default-input login-form-input" type="email" placeholder="Email" value={email}
                        name="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    <input className="default-input login-form-input" type="password" placeholder="Senha"
                        value={password}
                        name="password" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    <div className="signup-inputs">
                        <div className="location-details-dropdowns">
                            <div className="default-dropdown-menu">
                                <button type="button" className="default-dropdown-button"
                                    onClick={openDropdownMenuStates}>{selectedState}<span
                                        className="material-symbols-outlined">expand_more</span></button>
                                <div className="default-dropdown-content" id="dropdownStatesId">
                                    {apiStates.length > 0 ? (
                                        apiStates.map((apiStates) => (
                                            <div key={apiStates.sigla}>
                                                <ul className="dropdown-ul">
                                                    <li className="dropdown-li" onClick={() => {
                                                        setState(apiStates.sigla);
                                                        handleSelectedState(apiStates.nome);
                                                        openDropdownMenuStates()
                                                    }}>
                                                        <span className="dropdown-span default-span">{apiStates.nome}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <div>
                                            <ul className="dropdown-ul">
                                                <li className="dropdown-li">
                                                    <span className="default-span"></span>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="default-dropdown-menu">
                                <button type="button" className="default-dropdown-button"
                                    onClick={openDropdownMenuCity}>{selectedCity}<span
                                        className="material-symbols-outlined">expand_more</span></button>
                                <div className="default-dropdown-content" id="dropdownCityId">
                                    {apiCity.length > 0 ? (
                                        apiCity.map((apiCity) => (
                                            <div key={apiCity.codigo_ibge}>
                                                <ul className="dropdown-ul">
                                                    <li className="dropdown-li" onClick={() => {
                                                        handleSelectedCity(apiCity.nome);
                                                        setCity(apiCity.nome);
                                                        openDropdownMenuCity()
                                                    }}>
                                                        <span className="dropdown-span default-span">{apiCity.nome}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="checkbox-lgpd-input">
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                        <label>Você concorda com os <a href="#">Termos de Serviço</a> e a <a href="#">Política de
                            privacidade</a> do LISTTTA.</label>
                    </div>
                    <button className="btn" disabled={!isChecked} type="submit">Cadastrar</button>
                </form>
            );
        } else if (role === 'PROFESSIONAL' && type === 'PIERCER') {
            return (
                <>
                </>
            );
        } else if (role === 'PROFESSIONAL' && type === 'TATTOO') {
            return (
                <form id="user-form" onSubmit={(e) => signupUser(e)}>
                    <input className="default-input login-form-input" type="email" placeholder="Email" value={email}
                        name="email" onChange={(e) => {
                            setEmail(e.target.value)
                        }} />
                    <input className="default-input login-form-input" type="password" placeholder="Senha"
                        value={password}
                        name="password" onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                    <div className="signup-inputs">
                        <div className="location-details-dropdowns">
                            <div className="default-dropdown-menu">
                                <button type="button" className="default-dropdown-button"
                                    onClick={openDropdownMenuStates}>{selectedState}<span
                                        className="material-symbols-outlined">expand_more</span></button>
                                <div className="default-dropdown-content" id="dropdownStatesId">
                                    {apiStates.length > 0 ? (
                                        apiStates.map((apiStates) => (
                                            <div key={apiStates.sigla}>
                                                <ul className="dropdown-ul">
                                                    <li className="dropdown-li" onClick={() => {
                                                        setState(apiStates.sigla);
                                                        handleSelectedState(apiStates.nome);
                                                        openDropdownMenuStates()
                                                    }}>
                                                        <span
                                                            className="dropdown-span default-span">{apiStates.nome}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <span>Nenhum filtro encontrado</span>
                                    )}
                                </div>
                            </div>
                            <div className="default-dropdown-menu">
                                <button type="button" className="default-dropdown-button"
                                    onClick={openDropdownMenuCity}>{selectedCity}<span
                                        className="material-symbols-outlined">expand_more</span></button>
                                <div className="default-dropdown-content" id="dropdownCityId">
                                    {apiCity.length > 0 ? (
                                        apiCity.map((apiCity) => (
                                            <div key={apiCity.codigo_ibge}>
                                                <ul className="dropdown-ul">
                                                    <li className="dropdown-li" onClick={() => {
                                                        handleSelectedCity(apiCity.nome);
                                                        setCity(apiCity.nome);
                                                        openDropdownMenuCity()
                                                    }}>
                                                        <span
                                                            className="dropdown-span default-span">{apiCity.nome}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <span></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <input className="default-input login-form-input" type="text" placeholder="Seu instagram sem o @"
                        value={instagramUrl} name="instagram" onChange={(e) => {
                            setInstagramUrl(e.target.value)
                        }} />
                    <div className="checkbox-lgpd-input">
                        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
                        <label>Você concorda com os <a href="#">Termos de Serviço</a> e a <a href="#">Política de privacidade</a> do LISTTTA.</label>
                    </div>
                    <button className="btn" disabled={!isChecked} type="submit">Cadastrar</button>
                </form>
            );
        }
    }

    const loginType = () => {
        return (
            <div className="login-popup" id="login-type-hidden">
                <button className="login-close-button" onClick={() => {
                    resetFormSigup();
                    props.setTrigger(false)
                }}><img src={variables.closeMenu}></img></button>
                <div className="login-signup-container login-type-popup-container">
                    <div className="login-type-popup">
                        <h1>Você é?</h1>
                        <div className="login-type-popup-block-one">
                            <button className="login-type-popup-block" onClick={() => {
                                menuClickForUserSignup();
                                setRole("PROFESSIONAL");
                                setType('TATTOO')
                            }}>
                                <div className="login-type-popup-block-content">
                                    <img src="Assets/icons/accounts/tattoo.png" alt="Tattoo" />
                                    <span><a href="/signup/tattoo">Tatuador</a></span>
                                </div>
                            </button>
                            <button className="login-type-popup-block" onClick={() => {
                                menuClickForUserSignup();
                                setRole("PROFESSIONAL");
                                setType('PIERCER')
                            }}>
                                <div className="login-type-popup-block-content">
                                    <img src="Assets/icons/accounts/ear.png" alt="Piercer" />
                                    <span className="default-span">Piercer</span>
                                </div>
                            </button>
                        </div>
                        <div className="login-type-popup-block-two">
                            <button className="login-type-popup-block block-two" onClick={() => {
                                menuClickForUserSignup();
                                setRole("USER")
                            }}>
                                <div className="login-type-popup-block-content">
                                    <img className="block-two-img" src="Assets/icons/accounts/customer.png"
                                        alt="Cliente" />
                                    <span className="default-span">Cliente</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    const signUpContainer = () => {
        return (
            <div className="login-popup user-signup-div" id="user-signup">
                <button className="login-close-button" onClick={() => {
                    resetFormSigup();
                    props.setTrigger(false)
                }}><img src={variables.closeMenu}></img></button>
                <div className="container login-signup-container signup-container">
                    <div className="login-signup-content">
                        {signUpForms()}
                    </div>
                </div>
            </div>
        );
    }

    const loginScreen = () => {
        return (
            <div className="login-popup login-screen-div" id="login-screen">
                <button className="login-close-button" onClick={() => props.setTrigger(false)}><img
                    src={variables.closeMenu}></img>
                </button>
                <div className="container login-signup-container signup-container">
                    <div className="login-signup-content">
                        <form id="user-form" onSubmit={(e) => loginUser(e)}>
                            <input className="default-input login-form-input" type="email" placeholder="Email" value={email}
                                name="email" onChange={(e) => {
                                    setEmail(e.target.value)
                                }} />
                            <input className="default-input login-form-input" type="password" placeholder="Senha"
                                value={password}
                                name="password" onChange={(e) => {
                                    setPassword(e.target.value)
                                }} />
                            <button className="btn" type="submit">Entrar</button>

                        </form>
                    </div>
                </div>
            </div>
        );
    }

    return (props.trigger) ? (
        <div className="login-container">
            <div className="login-popup" id="login-signup-hidden">
                <button className="login-close-button" onClick={() => props.setTrigger(false)}><img
                    src={variables.closeMenu}></img></button>
                <div className="login-signup-container">
                    <div className="login-banner">
                        <img src={variables.loginBanner} alt="" />
                    </div>
                    <div className="login-fields">
                        <div className="login-top">
                            <p>Criar uma nova conta</p>
                            <span>Já tem uma conta? <a onClick={loginScreenButton}>Entrar</a></span>
                        </div>
                        <div className="login-buttons">
                            <button><img src="Assets/icons/social-networks/google.png" />Continuar com o Google</button>
                            <button onClick={menuClickForUserSelect}><img src="Assets/icons/social-networks/email.png" />Continuar
                                com o e-mail
                            </button>
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
                                e aceita receber nossos e-mails ocasionalmente. Leia nossa <a href="#">Política de
                                    Privacidade</a> para saber como usamos seus dados pessoais.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {loginType()}
            {signUpContainer()}
            {loginScreen()}
        </div>
    ) : "";
}
