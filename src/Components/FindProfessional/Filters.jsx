import { useEffect, useState } from "react";
import '../../Styles/Components/FindProfessionals/Filters.css';
import { unstable_HistoryRouter } from "react-router-dom";

export default function Filters({setFilteredProfessionals}) {

    //Variáveis padrão
    const [selectedButton, setSelectedButton] = useState('');
    const [showFilterMenu, setShowFilterMenu] = useState('none');
    const [selectedTextForState, setSelectedTextForState] = useState('Selecione uma opção');
    const [selectedTextForCity, setSelectedTextForCity] = useState('Selecione a cidade');
    const [selectedStateName, setSelectedStateName] = useState('');
    const [selectdCityName, setSelectedCity] = useState('');

    //Jsons recebenidos das APIs
    const [filters, setFilter] = useState([]);
    const [state, setState] = useState([]);
    const [cities, setCities] = useState('');

    const [filterState, setFilterState] = useState('');
    // const [filterCity, setFilterCity] = useState('');
    const [type, setType] = useState('');
    const [userGender, setUserGender] = useState('');

    const history = unstable_HistoryRouter();

    let filterData = {
        userGender: userGender,
        state: filterState,
        city: cities,
        type: type
    }

    //Url do banco de dados da hostinger
    // const url = "https://listtta-backend.lryftz.easypanel.host/filters/list/all"; 
    const filtersUrl = "https://listtta-backend.lryftz.easypanel.host/filters/list/all";
    const statesUrl = 'https://brasilapi.com.br/api/ibge/uf/v1';

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
                setState(data);
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

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;

        // Se clicar em "Ambos", limpar todos os valores
        if (value === 'Ambos' && checked) {
            setUserGender('');
        } else if (checked) {
            // Se clicar em Masculino ou Feminino, definir o valor correspondente
            setUserGender(value);
        }
    };
    // const fetchFilteredProfessionals = async () => {
    //     try {
    //         const queryParams = new URLSearchParams({
    //             userGender: userGender,
    //             state: filterState,
    //             city: cities,
    //             type: type
    //         }).toString();
    //         const response = await fetch(`https://listtta-backend.lryftz.easypanel.host/professionals/list/all/filters?${queryParams}`, {
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //         });
    
    //         const data = await response.json();
    //         setFilteredProfessionals(data);

    //         // Redirecionar para a nova URL após a aplicação dos filtros
    //         history.push(`/search?${queryParams}`);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    // Função para chamar a pesquisa quando o botão de aplicar for clicado
    const handleApplyFilters = () => {
        fetchFilteredProfessionals();
    };
    
    // console.log(filterData);

    return (
        <>
            <div className="filters-container-desktop">
                <div className="filters-section filters-section-desktop filters-desktop-center-div">
                    <button className={`btn filters-btn filters-btn-desktop ${selectedButton === 'button1' ? 'selected' : ''}`} onClick={() => { handleProfessionalTypeButtoClick('button1'); setType('') }}>Tudo</button>
                    <button className={`btn filters-btn filters-btn-desktop ${selectedButton === 'button2' ? 'selected' : ''}`} onClick={() => { handleProfessionalTypeButtoClick('button2'); setType('TATTOO') }}>Tatuador</button>
                    <button className={`btn filters-btn filters-btn-desktop ${selectedButton === 'button3' ? 'selected' : ''}`} onClick={() => { handleProfessionalTypeButtoClick('button3'); setType('PIERCER') }}>Body Piercer</button>
                </div>
                <div className="filters-section filters-section-desktop localtion-filters">
                    <div className="filters-desktop-center-div mbt-10">
                        <div className="filters-dropdown-menu">
                            <p>Localização</p>
                            <button className="btn filters-btn filters-btn-desktop" id="state-dropdown-button" onClick={openDropdownStates}>{selectedTextForState}<span className="material-symbols-outlined">expand_more</span></button>
                            <div className="filters-dropdown-content-desktop" id="dropdownIdStates">
                                {state.length > 0 ? (
                                    state.map((states) => (
                                        <div key={states.id} className="states-div">
                                            <ul className="dropdown-ul">
                                                <li className="dropdown-li" onClick={() => { handleSelectState(states.nome); setSelectedStateName(states.sigla); fetchCities(); setFilterState(states.nome) }}>
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
                            <button className="btn filters-btn filters-btn-desktop" onClick={openDropdownCities}>{selectedTextForCity}<span className="material-symbols-outlined">expand_more</span></button>
                            <div className="filters-dropdown-content-desktop" id="dropdownIdCities">
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
                </div>
                <div className="filters-desktop-left-div">
                    <div className="filters-section categories-filters">
                        <div className="filters filters-desktop">
                            <div className="filters-span filters-span-desktop">
                                <span>Gênero</span>
                            </div>
                            <form action="">
                                <ul className="filters-ul filters-desktop">
                                    <li>
                                        <input className="checkbox-round" type="checkbox" id="tatuador" name="gender" value={"Ambos"} checked={userGender === ''} onChange={handleCheckboxChange} />
                                        <label htmlFor="tatuador">Ambos</label>
                                    </li>
                                    <li>
                                        <input className="checkbox-round" type="checkbox" id="tatuador" name="gender" value={"MASCULINO"} checked={userGender === 'Masculino'} onChange={handleCheckboxChange} />
                                        <label htmlFor="tatuador">Tatuador</label>
                                    </li>
                                    <li>
                                        <input className="checkbox-round" type="checkbox" id="tatuadora" name="gender" value={"FEMININO"} checked={userGender === 'Feminino'} onChange={handleCheckboxChange} />
                                        <label htmlFor="tatuadora">Tatuadora</label>
                                    </li>
                                </ul>
                            </form>
                        </div>
                    </div>
                    <div className="filters filters-desktop theme-filter">
                        <div className="filters-span filter-span-mobile">
                            <span>Tipos de tattoo</span>
                        </div>
                        <div className="mobile-filter-form">
                            <form>
                                <ul className="filters-ul filters-desktop">
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
                </div>
                {/* <button onClick={handleApplyFilters}>Aplicar</button> */}

            </div>
        </>
    );

}