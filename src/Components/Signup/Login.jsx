import { useEffect, useState } from "react";
import { variables } from "../../Variables";

import '../../Styles/Components/LoginRegister/Login.css';

export default function Login(props) {
    const [showLogin, setShowLogin] = useState('none');
    const [showUserTypeSelection, setUserTypeSelection] = useState(false);

    //consts do formulário de signup
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [taxNumber, setTaxNumber] = useState('');
    const [role, setRole] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [instagramUrl, setInstagramUrl] = useState('');
    const [skills, setSkills] = useState('');

    //Dropdowns content
    const [filters, setFilters] = useState([]);
    const [apiStates, setApiStates] = useState([]);
    const [apiCity, setApiCity] = useState([]);

    const [selectedState, setSelectedState] = useState("Seu estado");
    const [selectedCity, setSelectedCity] = useState("Sua Cidade");

    //URLs
    let baseFiltersUrl = "https://listtta-backend.lryftz.easypanel.host/filters/list/all";
    let baseStatesUrl = 'https://brasilapi.com.br/api/ibge/uf/v1';
    let baseCitiesUrl = 'https://brasilapi.com.br/api/ibge/municipios/v1/';

    //Reset do formulário
    const resetForm = () => {
        setFullName('');
        setEmail('');
        setPassword('');
        setTaxNumber('');
        setRole('');
        setState('');
        setCity('');
        setType('');
        setInstagramUrl('');
        setSkills('')
    }

    //Formulaŕio de signup
    const signUpForm = {
        fullName: fullName,
        email: email,
        password: password,
        taxNumber: taxNumber,
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
        if (type.style.display == 'block') {
            type.style.display = 'none'; // Oculta a seção type
            signup.style.display = 'block'; // Exibe a seção signup
        } else {
            type.style.display = 'block'; // Exibe a seção type
            signup.style.display = 'none'; // Oculta a seção signup
        }
    }

    useEffect(() => {
        async function fetchFilters() {
            try {
                const response = await fetch(baseFiltersUrl);
                const data = await response.json();
                setFilters(data);
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchFilters();
    }, [])

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
            const response = await fetch(baseCitiesUrl + state + '?providers=dados-abertos-br,gov,wikipedia');
            const data = await response.json();
            setApiCity(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    }

    async function signupUser() {
        let signupUrl = 'https://listtta-backend.lryftz.easypanel.host/auth/signup';

        try {
            const response = await fetch(signupUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signUpForm)
            });
            if (!response.ok) {
                throw new Error('Erro ao cadastrar')
            } else {
                alert('Cadastro com sucesso!')
            }
        } catch (error) {
            console.error("Erro no cadastro" + error)
        }
    }

    function openDropdownMenuStates() {
        const dropdown = document.getElementById('dropdownStatesId');
        if (dropdown.style.display === "none") {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }

    function openDropdownMenuCity() {
        const dropdown = document.getElementById('dropdownCityId');
        if (dropdown.style.display === "none") {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }

    const handleSelectedState = (option) => {
        setSelectedState(option);
    }

    const handleSelectedCity = (option) => {
        setSelectedCity(option);
    }

    const signUpForms = () => {
        if (role === 'USER') {
            return (
                <form onSubmit={signupUser} id="user-form">
                    <div className="signup-input">
                        <label htmlFor="fullName">Nome Completo</label>
                        <input className="default-input" type="text" placeholder="Seu nnome completo" value={fullName} name="fullName" onChange={(e) => { setFullName(e.target.value) }} />
                    </div>
                    <div className="signup-input">
                        <label htmlFor="email">Seu Email</label>
                        <input className="default-input" type="email" placeholder="exemplo@gmail.com" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="signup-input">
                        <label htmlFor="password">Sua senha</label>
                        <input className="default-input" type="password" placeholder="Sua Senha" value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="signup-input">
                        <label htmlFor="taxNumber">Seu CPF</label>
                        <input className="default-input" type="text" placeholder="Sem pontuação ou traços" value={taxNumber} name="taxNumber" onChange={(e) => { setTaxNumber(e.target.value) }} />
                    </div>
                    <div className="location-details-dropdowns">
                        <div className="filters-dropdown-menu">
                            <button type="button" className="btn filters-btn filters-btn-desktop" onClick={openDropdownMenuStates}>{selectedState}<span className="material-symbols-outlined">expand_more</span></button>
                            <div className="filters-dropdown-content-desktop" id="dropdownStatesId">
                                {apiStates.length > 0 ? (
                                    apiStates.map((apiStates) => (
                                        <div key={apiStates.sigla}>
                                            <ul className="dropdown-ul">
                                                <li className="dropdown-li" onClick={() => { handleSelectedState(apiStates.nome); setState(apiStates.sigla); fetchCities() }}>
                                                    <span className="dropdown-span default-span">{apiStates.nome}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <span>Nenhum filtro encontrado</span>
                                )}
                            </div>
                        </div>
                        <div className="filters-dropdown-menu">
                            <button type="button" className="btn filters-btn filters-btn-desktop" onClick={openDropdownMenuCity}>{selectedCity}<span className="material-symbols-outlined">expand_more</span></button>
                            <div className="filters-dropdown-content-desktop" id="dropdownCityId">
                                {apiCity.length > 0 ? (
                                    apiCity.map((apiCity) => (
                                        <div key={apiCity.id}>
                                            <ul className="dropdown-ul">
                                                <li className="dropdown-li" onClick={() => { handleSelectedCity(apiCity.nome); setCity(apiCity.nome) }}>
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
                    <button className="btn" type="submit">Cadastrar</button>
                </form>
            );
        } else if (role === 'PROFESSIONAL' && type === 'PIERCER') {
            return (
                <form id="user-form" onSubmit={signupUser}>
                    <div className="signup-input">
                        <label htmlFor="fullName">Nome Completo</label>
                        <input className="default-input" type="text" placeholder="Seu nnome completo" value={fullName} name="fullName" onChange={(e) => { setFullName(e.target.value) }} />
                    </div>
                    <div className="signup-input">
                        <label htmlFor="email">Seu Email</label>
                        <input className="default-input" type="email" placeholder="exemplo@gmail.com" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="signup-input">
                        <label htmlFor="password">Sua Senha</label>
                        <input className="default-input" type="password" placeholder="Sua Senha" value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="signup-input">
                        <label htmlFor="taxNumber">Seu CPF</label>
                        <input className="default-input" type="text" placeholder="Sem pontuação ou traços" value={taxNumber} name="taxNumber" onChange={(e) => { setTaxNumber(e.target.value) }} />
                    </div>
                    <div className="signup-inputs">
                        <div className="location-details-dropdowns">
                            <div className="filters-dropdown-menu">
                                <button type="button" className="btn filters-btn filters-btn-desktop" onClick={openDropdownMenuStates}>{selectedState}<span className="material-symbols-outlined">expand_more</span></button>
                                <div className="filters-dropdown-content-desktop" id="dropdownStatesId">
                                    {apiStates.length > 0 ? (
                                        apiStates.map((apiStates) => (
                                            <div key={apiStates.sigla}>
                                                <ul className="dropdown-ul">
                                                    <li className="dropdown-li" onClick={() => { handleSelectedState(apiStates.nome); setState(apiStates.sigla); fetchCities() }}>
                                                        <span className="dropdown-span default-span">{apiStates.nome}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <span>Nenhum filtro encontrado</span>
                                    )}
                                </div>
                            </div>
                            <div className="filters-dropdown-menu">
                                <button type="button" className="btn filters-btn filters-btn-desktop" onClick={openDropdownMenuCity}>{selectedCity}<span className="material-symbols-outlined">expand_more</span></button>
                                <div className="filters-dropdown-content-desktop" id="dropdownCityId">
                                    {apiCity.length > 0 ? (
                                        apiCity.map((apiCity) => (
                                            <div key={apiCity.id}>
                                                <ul className="dropdown-ul">
                                                    <li className="dropdown-li" onClick={() => { handleSelectedCity(apiCity.nome); setCity(apiCity.nome) }}>
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
                        <div className="professional-details-inputs">
                            <div className="signup-input">
                                <label htmlFor="instagram">Seu Instagram</label>
                                <input className="default-input" type="text" placeholder="Seu instagram sem o @" value={instagramUrl} name="instagram" onChange={(e) => { setInstagramUrl(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <button className="btn" type="submit">Cadastrar</button>
                </form>
            );
        } else if (role === 'PROFESSIONAL' && type === 'TATTOO') {
            return (
                <form id="user-form">
                    <div className="signup-input">
                        <label htmlFor="fullName">Nome Completo</label>
                        <input className="default-input" type="text" placeholder="Seu nnome completo" value={fullName} name="fullName" onChange={(e) => { setFullName(e.target.value) }} />
                    </div>
                    <div className="signup-input">
                        <label htmlFor="email">Seu Email</label>
                        <input className="default-input" type="email" placeholder="exemplo@gmail.com" value={email} name="email" onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="signup-input">
                        <label htmlFor="password">Sua senha</label>
                        <input className="default-input" type="password" placeholder="Sua Senha" value={password} name="password" onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="signup-input">
                        <label htmlFor="taxNumber">Seu CPF</label>
                        <input className="default-input" type="text" placeholder="Sem pontuação ou traços" value={taxNumber} name="taxNumber" onChange={(e) => { setTaxNumber(e.target.value) }} />
                    </div>
                    <div className="signup-inputs">
                        <div className="location-details-dropdowns">
                            <div className="filters-dropdown-menu">
                                <button type="button" className="btn filters-btn filters-btn-desktop" onClick={openDropdownMenuStates}>{selectedState}<span className="material-symbols-outlined">expand_more</span></button>
                                <div className="filters-dropdown-content-desktop" id="dropdownStatesId">
                                    {apiStates.length > 0 ? (
                                        apiStates.map((apiStates) => (
                                            <div key={apiStates.sigla}>
                                                <ul className="dropdown-ul">
                                                    <li className="dropdown-li" onClick={() => { handleSelectedState(apiStates.nome); setState(apiStates.sigla); fetchCities() }}>
                                                        <span className="dropdown-span default-span">{apiStates.nome}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        ))
                                    ) : (
                                        <span>Nenhum filtro encontrado</span>
                                    )}
                                </div>
                            </div>
                            <div className="filters-dropdown-menu">
                                <button type="button" className="btn filters-btn filters-btn-desktop" onClick={openDropdownMenuCity}>{selectedCity}<span className="material-symbols-outlined">expand_more</span></button>
                                <div className="filters-dropdown-content-desktop" id="dropdownCityId">
                                    {apiCity.length > 0 ? (
                                        apiCity.map((apiCity) => (
                                            <div key={apiCity.id}>
                                                <ul className="dropdown-ul">
                                                    <li className="dropdown-li" onClick={() => { handleSelectedCity(apiCity.nome); setCity(apiCity.nome) }}>
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
                        <div className="professional-details-inputs">
                            <div className="signup-input">
                                <label htmlFor="instagram">Seu Instagram</label>
                                <input className="default-input" type="text" placeholder="Seu instagram sem o @" value={instagramUrl} name="instagram" onChange={(e) => { setInstagramUrl(e.target.value) }} />
                            </div>
                        </div>
                    </div>
                    <button className="btn" type="submit">Cadastrar</button>
                </form>
            );
        }
    }

    const loginType = () => {
        return (
            <div className="login-popup" id="login-type-hidden">
                <button className="login-close-button" onClick={() => {
                    resetForm();
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
                                    <img src="Assets/icons/accounts/tattoo.png" alt="Tattoo"/>
                                    <span><a href="/signup/tattoo">Tatuador</a></span>
                                </div>
                            </button>
                            <button className="login-type-popup-block" onClick={() => {
                                menuClickForUserSignup();
                                setRole("PROFESSIONAL");
                                setType('PIERCER')
                            }}>
                                <div className="login-type-popup-block-content">
                                    <img src="Assets/icons/accounts/ear.png" alt="Piercer"/>
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
                                         alt="Cliente"/>
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
                    resetForm();
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
    return (props.trigger) ? (
        <div className="login-container">
            <div className="login-popup" id="login-signup-hidden">
                <button className="login-close-button" onClick={() => props.setTrigger(false)}><img
                    src={variables.closeMenu}></img></button>
                <div className="login-signup-container">
                    <div className="login-banner">
                        <img src={variables.loginBanner} alt=""/>
                    </div>
                    <div className="login-fields">
                        <div className="login-top">
                            <p>Criar uma nova conta</p>
                            <span>Já tem uma conta? <a href="#">Entrar</a></span>
                        </div>
                        <div className="login-buttons">
                            <button><img src="Assets/icons/social-networks/google.png"/>Continuar com o Google</button>
                            <button onClick={menuClickForUserSelect}><img src="Assets/icons/social-networks/email.png"/>Continuar
                                com o e-mail
                            </button>
                            <div className="login-breaker">
                                <p>ou</p>
                            </div>
                            <div className="other-methods">
                                <button><img src="Assets/icons/social-networks/apple.png"/>Apple</button>
                                <button><img src="Assets/icons/social-networks/facebook.png"/>Facebook</button>
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
        </div>
    ) : "";
}
