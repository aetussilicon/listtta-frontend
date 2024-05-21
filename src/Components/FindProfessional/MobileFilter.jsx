import { useEffect, useState } from "react";
import '../../Styles/Components/FindProfessionals/MobileFilters.css';

export default function MobileFilter(props) {

    //Variáveis padrão
    const [selectedButton, setSelectedButton] = useState('');
    const [showFilterMenu, setShowFilterMenu] = useState('none');
    const [selectedTextForState, setSelectedTextForState] = useState('Selecione uma opção');
    const [selectedTextForCity, setSelectedTextForCity] = useState('Selecione a cidade');
    const [selectedStateName, setSelectedStateName] = useState('');
    const [selectdCityName, setSelectedCity] = useState('');

    //Jsons recebenidos das APIs
    const [filters, setFilter] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    //Url do banco de dados da hostinger
    // const url = "https://listtta-backend.lryftz.easypanel.host/filters/list/all"; 
    const filtersUrl = "https://listtta-backend.lryftz.easypanel.host/filters/list/all";
    const statesUrl = 'https://brasilapi.com.br/api/ibge/uf/v1';

    //Formulário para pesquisa
    // let state = use;
    // let city = selectdCityName;
    const [professionalType, setProfessionalType] = useState('');
    const [userGender, setUserGender] = useState('');

    // let searchForm = {
    //     state,
    //     city
    // }

    //Funções para abrir os menus dropdown
    function openDropdownStates() {
        const dropdown = document.getElementById("dropdownIdStates");
        if (dropdown.style.display === "none") {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }

    function openDropdownCities() {
        const dropdown = document.getElementById("dropdownIdCities");
        if (dropdown.style.display === "none") {
            dropdown.style.display = "block";
        } else {
            dropdown.style.display = "none";
        }
    }

    //Função para trocar cor de botão
    const handleProfessionalTypeButtoClick = (buttoName) => {
        setSelectedButton(buttoName);
    }

    //Requisções para buscar estados e cidades
    //Requisição para pegar os filtros no banco de dados
    useEffect(() => {
        async function fetchFilters() {
            try {
                const resposne = await fetch(filtersUrl, {
                    headers: {
                        'Content-Type': 'application.json',
                        // Authorization: 'Bearer ' + localStorage.getItem('user_token')
                    }
                });

                const data = await resposne.json();
                console.log(data);
                setFilter(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFilters();
    }, [])

    //Fetch para os estados do dropdown menu
    useEffect(() => {
        async function fetchStates() {
            try {
                const response = await fetch(statesUrl);

                const data = await response.json();
                console.log(data);
                setStates(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchStates();
    }, [])

    //Fetch para as cidades do segundo dropdown menu
    async function fetchCities() {
        const citiesUrl = 'https://brasilapi.com.br/api/ibge/municipios/v1/' + selectedStateName + '?providers=dados-abertos-br,gov,wikipedia';

        try {
            const response = await fetch(citiesUrl);

            const data = await response.json();
            console.log(data);
            setCities(data);
        } catch (error) {
            console.log(error);
        }
    }

    //Setando os textos dos botões
    const handleSelectState = (option) => {
        setSelectedTextForState(option);
    };

    const handleSelectCity = (option) => {
        setSelectedCity(option);
    };

    //Logs
    console.log(professionalType);

    return (props.trigger) ? (
        <>
            <div className="main-filter-content">
                <div className="filter-top-bar">
                    <span>Filtros Avançados</span>
                    <button onClick={() => props.setTrigger(false)} className="login-button">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <div className="filters-container-mobile">
                    <div className="filters-section filters-section-mobile location-filters">
                        <p>Localização</p>
                        <div className="filters-dropdown-menu">
                            <button className="btn filters-btn filters-btn-mobile" id="state-dropdown-button" onClick={openDropdownStates}>{selectedTextForState}<span className="material-symbols-outlined">expand_more</span></button>
                            <div className="filters-dropdown-content" id="dropdownIdStates">
                                {states.length > 0 ? (
                                    states.map((states) => (
                                        <div key={states.id} className="states-div">
                                            <ul className="dropdown-ul">
                                                <li className="dropdown-li" onClick={() => { handleSelectState(states.nome); setSelectedStateName(states.sigla); fetchCities() }}>
                                                    <span className="dropdown-span default-span">{states.nome}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <span>Nenhum estado encontrado</span>
                                )}
                            </div>
                        </div>
                        <div className="filters-dropdown-menu">
                            <button className="btn filters-btn filters-btn-mobile" onClick={openDropdownCities}>{selectedTextForCity}<span className="material-symbols-outlined">expand_more</span></button>
                            <div className="filters-dropdown-content" id="dropdownIdCities">
                                {cities.length > 0 ? (
                                    cities.map((cities) => (
                                        <div>
                                            <ul className="dropdown-ul">
                                                <li className="dropdown-li" onClick={() => { handleSelectCity(cities.nome); setSelectedTextForCity(cities.nome) }}>
                                                    <span className="dropdown-span default-span">{cities.nome}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    ))
                                ) : (
                                    <span>Nenhuma cidade encontrado</span>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="filters-section filters-section-mobile">
                        <p>Escolha o profissional</p>
                        <button className={`btn filters-btn filters-btn-mobile ${selectedButton === 'button1' ? 'selected' : ''}`} onClick={() => handleProfessionalTypeButtoClick('button1')}>Tudo</button>
                        <button className={`btn filters-btn filters-btn-mobile ${selectedButton === 'button2' ? 'selected' : ''}`} onClick={() => { setProfessionalType("TATTOO"); handleProfessionalTypeButtoClick('button2') }}>Tatuador</button>
                        <button className={`btn filters-btn filters-btn-mobile ${selectedButton === 'button3' ? 'selected' : ''}`} onClick={() => { setProfessionalType("PIERCER"); handleProfessionalTypeButtoClick('button3') }}>Body Piercer</button>
                    </div>
                    <div className="filters-section categories-filters">
                        <div className="filters filters-mobile  gen-filter">
                            <div className="filters-span filter-span-mobile">
                                <span>Gênero</span>
                            </div>
                            <form>
                                <ul className="filters-ul filters-ul-mobile">
                                    <li>
                                        <input className="checkbox-round" type="checkbox" id="tatuador" name="gender" />
                                        <label htmlFor="tatuador">Ambos</label>
                                    </li>
                                    <li>
                                        <input className="checkbox-round" type="checkbox" id="tatuador" name="gender" />
                                        <label htmlFor="tatuador">Tatuador</label>
                                    </li>
                                    <li>
                                        <input className="checkbox-round" type="checkbox" id="tatuadora" name="gender" />
                                        <label htmlFor="tatuadora">Tatuadora</label>
                                    </li>
                                </ul>
                            </form>
                        </div>
                        <div className="filter-breaker" />
                        <div className="filters filters-mobile theme-filter">
                            <div className="filters-span filter-span-mobile">
                                <span>Tipos de tattoo</span>
                            </div>
                            <div className="mobile-filter-form">
                                <form>
                                    <ul className="filters-ul filters-ul-mobile">
                                        {filters.length > 0 ? (
                                            filters.map((filters) => (
                                                <div key={filters.filterId} className="filters-div">
                                                    <li className="filters-name">
                                                        <input className="checkbox-round" type="checkbox" id={filters.filterName} name="filters-input" />
                                                        <label htmlFor={filters.filterName}>{filters.displayName}</label>
                                                    </li>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="filters-span">Nenhum filtro encontrado</span>
                                        )}
                                    </ul>
                                </form>
                            </div>
                        </div>
                        <div className="filter-breaker" />
                        <div className="apply-button">
                            <button className="btn">Aplicar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    ) : "";
}