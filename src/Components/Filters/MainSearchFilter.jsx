import {useContext, useEffect, useState} from 'react';
import '../../Styles/Components/Filters/MainSearchFilter.css';
import {StatesContext} from '../../Contexts/StatesContext';
import {CitiesContext} from '../../Contexts/CitiesContext';
import {FiltersContext} from '../../Contexts/FiltersConxtext';
import {ProfessionalsContext} from '../../Contexts/ProfessionalsContext';

const allowedCities = [
    'Sao paulo',
    'São paulo',
    'São Paulo',
    'sao paulo',
    'são paulo',
    'Rio de Janeiro',
    'Rio de janeiro',
    'rio de janeiro,',
    'SP',
    'sp',
    'RJ',
    'rj',
];

const citiesZones = [
    {id: 1, zone: 'Sul'},
    {id: 2, zone: 'Norte'},
    {id: 3, zone: 'Centro'},
    {id: 4, zone: 'Leste'},
    {id: 5, zone: 'Oeste'},
];

const experienceTimes = [
    {id: "LESS_THAN_3_YEARS", label: "Até 3 anos"},
    {id: "FROM_3_TO_7_YEARS", label: "Entre 3 a 7 anos"},
    {id: "MORE_THAN_7_YEARS", label: "Mais de 7 anos"}
]

export default function MainSearchFilter() {
    //Contextos
    const {professionalsAPI, setFilteredData} =
        useContext(ProfessionalsContext);
    const {statesAPI} = useContext(StatesContext);
    const {setStateName, citiesAPI} = useContext(CitiesContext);
    const {specialtiesAPI} = useContext(FiltersContext);

    //Botões e Dropdowns
    const [seletectButton, setSelectedButton] = useState('');
    const [selectedState, setSelectedState] = useState('Selecione o estado');
    const [selectedCity, setSelectedCity] = useState('Selecione a cidade');
    const [selectedZone, setSelectedZone] = useState('Selecione a zona');
    const [selectedExperienceTime, setSelectedExperienceTime] = useState('Tempo de experiência');

    //Filters
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [cityZone, setCityZone] = useState('');
    const [type, setType] = useState('');
    const [gender, setGender] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [experienceTime, setExperienceTime] = useState('');

    function openDropdownMenu(divId) {
        const dropdown = document.getElementById(divId);
        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    }

    const handleSelectedOption = (setSelect, option) => {
        setSelect(option);
    };

    const handleCheckboxChange = (event) => {
        const {value, checked} = event.target;

        // Se clicar em "Ambos", limpar todos os valores
        if (value === 'Ambos' && checked) {
            setGender('');
        } else if (checked) {
            // Se clicar em Masculino ou Feminino, definir o valor correspondente
            setGender(value);
        }
    };

    const applyFilters = () => {
        let filteredProfessionals = professionalsAPI;

        // Filtrar por estado, se selecionado
        if (state !== '') {
            filteredProfessionals = filteredProfessionals.filter(
                (professional) => professional.address?.state === state
            );
        }

        // Filtrar por cidade, se selecionado
        if (city !== '') {
            filteredProfessionals = filteredProfessionals.filter(
                (professional) => professional.address?.city === city
            );
        }

        if (experienceTime !== '') {
            filteredProfessionals = filteredProfessionals.filter(
                (professional) => professional.experienceTime === experienceTime
            );
        }

        if (cityZone !== '') {
            filteredProfessionals = filteredProfessionals.filter(
                (professional) => professional.address?.cityZone === cityZone
            );
        }

        // Filtrar por gênero, se selecionado
        if (gender !== '') {
            filteredProfessionals = filteredProfessionals.filter(
                (professional) => professional.gender === gender
            );
        }

        // Filtrar por tipo de profissional, se selecionado
        if (type !== '') {
            filteredProfessionals = filteredProfessionals.filter(
                (professional) => professional.details?.type === type
            );
        }

        // Filtrar por habilidades, se selecionado
        if (selectedSkills.length > 0) {
            filteredProfessionals = filteredProfessionals.filter((professional) =>
                professional.details?.skills?.some(
                    (skill) => skill && selectedSkills.includes(skill.toString())
                )
            );
        }

        // Atualizar o estado com os resultados filtrados
        setFilteredData(filteredProfessionals);
    };

    useEffect(() => {
        applyFilters();
    }, [professionalsAPI, state, city, seletectButton, type, gender, selectedSkills, cityZone, experienceTime]);

    useEffect(() => {
        //   console.log("Estado " + state);
        //   console.log("Cidade " + city);
        //   console.log("Tipo " + type);
        //   console.log("Gênero " + gender);
        console.log("Tempo de experiência: " + experienceTime);
    });

    const stateDropdownClick = (stateAcronym, stateName) => {
        setStateName(stateAcronym);
        setState(stateAcronym);
        handleSelectedOption(setSelectedState, stateName);
        openDropdownMenu('dropdownStatesId');
    };

    const cityDropdownClick = (cityName) => {
        setCity(cityName);
        handleSelectedOption(setSelectedCity, cityName);
        openDropdownMenu('dropdownCityId');
    };

    const zoneDropdownClick = (zone) => {
        setCityZone(zone);
        handleSelectedOption(setSelectedZone, zone);
        openDropdownMenu('dropdownZonesId');
    };

    const experienceDropdownClick = (experienceTime, selectedExperience) => {
        setExperienceTime(experienceTime);
        handleSelectedOption(setSelectedExperienceTime, selectedExperience);
        openDropdownMenu('dropdownExperienceTimeId');
    }

    const handleSelectedUserTypeButton = (button, type) => {
        setSelectedButton(button);
        setType(type);
    };

    const handleSkillChange = (event) => {
        const {value, checked} = event.target;

        if (checked) {
            setSelectedSkills((prevSelectedSkills) => [...prevSelectedSkills, value]);
        } else {
            setSelectedSkills((prevSelectedSkills) =>
                prevSelectedSkills.filter((id) => id !== value)
            );
        }
    };

    return (
        <div className='main-filters-container'>
            <div className='filters-section filters-button-section'>
                <button
                    className={`white-btn ${
                        seletectButton === 'button1' ? 'selected-filter-button' : ''
                    }`}
                    onClick={() => {
                        handleSelectedUserTypeButton('button1', '');
                    }}>
                    Todos
                </button>
                <button
                    className={`white-btn ${
                        seletectButton === 'button2' ? 'selected-filter-button' : ''
                    }`}
                    onClick={() => {
                        handleSelectedUserTypeButton('button2', 'TATTOO');
                    }}>
                    Tatuador
                </button>
                <button
                    className={`white-btn ${
                        seletectButton === 'button3' ? 'selected-filter-button' : ''
                    }`}
                    onClick={() => {
                        handleSelectedUserTypeButton('button3', 'PIERCER');
                    }}>
                    Body Piercer
                </button>
            </div>
            <div className='filters-section location-filters'>
                <span className='default-span location-filters-span'>Localização</span>

                <div className='default-dropdown-menu filters-dropdown-menu'>
                    <button
                        type='button'
                        className='default-dropdown-button'
                        onClick={() => openDropdownMenu('dropdownStatesId')}>
                        {selectedState}
                        <span className='material-symbols-outlined'>expand_more</span>
                    </button>
                    <div
                        className='default-dropdown-content location-dropdown-content'
                        id='dropdownStatesId'>
                        {statesAPI.length > 0 ? (
                            statesAPI.map((statesAPI) => (
                                <div key={statesAPI.sigla}>
                                    <ul className='dropdown-ul'>
                                        <li
                                            className='dropdown-li location-filters-dropdown-li'
                                            onClick={() => {
                                                stateDropdownClick(statesAPI.sigla, statesAPI.nome);
                                            }}>
                      <span className='dropdown-span default-span'>
                        {statesAPI.nome}
                      </span>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <div>
                                <ul className='dropdown-ul'>
                                    <li className='dropdown-li location-filters-dropdown-li'>
                                        <span className='default-span'></span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                <div className='default-dropdown-menu filters-dropdown-menu'>
                    <button
                        className='default-dropdown-button'
                        onClick={() => openDropdownMenu('dropdownCityId')}>
                        {selectedCity}
                        <span className='material-symbols-outlined'>expand_more</span>
                    </button>
                    <div
                        className='default-dropdown-content location-dropdown-content'
                        id='dropdownCityId'>
                        {citiesAPI.length > 0 ? (
                            citiesAPI.map((citiesAPI) => (
                                <div key={citiesAPI.codigo_ibge}>
                                    <ul className='dropdown-ul'>
                                        <li
                                            className='dropdown-li'
                                            onClick={() => {
                                                cityDropdownClick(citiesAPI.nome);
                                            }}>
                      <span className='dropdown-span default-span'>
                        {citiesAPI.nome}
                      </span>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <div>
                                <ul className='dropdown-ul'>
                                    <li className='dropdown-li'>
                    <span className='default-span'>
                      Nenhuma cidade encontrada
                    </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                {allowedCities.includes(selectedCity) && (
                    <div className='default-dropdown-menu filters-dropdown-menu'>
                        <button
                            type='button'
                            className='default-dropdown-button'
                            onClick={() => {
                                openDropdownMenu('dropdownZonesId');
                            }}>
                            {selectedZone}
                            <span className='material-symbols-outlined'>expand_more</span>
                        </button>
                        <div
                            className='default-dropdown-content location-dropdown-content'
                            id='dropdownZonesId'>
                            {citiesZones.length > 0
                                ? citiesZones.map((zone) => (
                                    <div key={zone.id}>
                                        <ul className='dropdown-ul'>
                                            <li
                                                className='dropdown-li location-filters-dropdown-li'
                                                onClick={() => {
                                                    zoneDropdownClick(zone.zone);
                                                }}>
                          <span className='dropdown-span default-span'>
                            {zone.zone}
                          </span>
                                            </li>
                                        </ul>
                                    </div>
                                ))
                                : ''}
                        </div>
                    </div>
                )}
            </div>
            <div className="filters-section experienceTime-filters">
                <span className='default-span location-filters-span'>Tempo de experiência</span>
                <div className='default-dropdown-menu filters-dropdown-menu'>
                    <button
                        className='default-dropdown-button'
                        onClick={() => openDropdownMenu('dropdownExperienceTimeId')}>
                        {selectedExperienceTime}
                        <span className='material-symbols-outlined'>expand_more</span>
                    </button>
                    <div
                        className='default-dropdown-content experience-dropdown-content'
                        id='dropdownExperienceTimeId'>
                        {experienceTimes.length > 0 ? (
                            experienceTimes.map((option) => (
                                <div key={option.id}>
                                    <ul className='dropdown-ul'>
                                        <li
                                            className='dropdown-li'
                                            onClick={() => {
                                                experienceDropdownClick(option.id, option.label);
                                            }}>
                      <span className='dropdown-span default-span'>
                        {option.label}
                      </span>
                                        </li>
                                    </ul>
                                </div>
                            ))
                        ) : (
                            <div>
                                <ul className='dropdown-ul'>
                                    <li className='dropdown-li'>
                    <span className='default-span'>
                      Nenhuma cidade encontrada
                    </span>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='filters-section gender-filters'>
                <span className='filters-span default-span'>Gênero</span>
                <form action=''>
                    <ul className='filters-ul'>
                        <li>
                            <input
                                className='checkbox-round'
                                type='checkbox'
                                id='ambos'
                                name='gender'
                                value={'Ambos'}
                                checked={gender === ''}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor='tatuador'>Ambos</label>
                        </li>
                        <li>
                            <input
                                className='checkbox-round'
                                type='checkbox'
                                id='tatuador'
                                name='gender'
                                value={'MASCULINO'}
                                checked={gender === 'MASCULINO'}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor='tatuador'>Tatuador</label>
                        </li>
                        <li>
                            <input
                                className='checkbox-round'
                                type='checkbox'
                                id='tatuador'
                                name='gender'
                                value={'FEMININO'}
                                checked={gender === 'FEMININO'}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor='tatuador'>Tatuadora</label>
                        </li>
                    </ul>
                </form>
            </div>
            <div className='filters-section tattoo-filters'>
                <span className='default-span filters-span'>Temas de tatuagem</span>
                <form action=''>
                    <ul className='filters-ul'>
                        {specialtiesAPI.length > 0 ? (
                            specialtiesAPI.map((skill) => (
                                <div key={skill.filterId}>
                                    <li>
                                        <input
                                            className='checkbox-round'
                                            type='checkbox'
                                            id={skill.filterName}
                                            name='filters-input'
                                            value={skill.filterId}
                                            onChange={handleSkillChange}
                                        />
                                        <label htmlFor={skill.filterName}>
                                            {skill.displayName}
                                        </label>
                                    </li>
                                </div>
                            ))
                        ) : (
                            <span className='filters-span'>Nenhum filtro encontrado</span>
                        )}
                    </ul>
                </form>
            </div>
        </div>
    );
}
