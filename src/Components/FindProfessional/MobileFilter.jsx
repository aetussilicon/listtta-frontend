import "../../Styles/Components/FindProfessionals/MobileFilters.css";
import { ProfessionalsContext } from "../../Contexts/ProfessionalsContext";
import { StatesContext } from "../../Contexts/StatesContext";
import { CitiesContext } from "../../Contexts/CitiesContext";
import { FiltersContext } from "../../Contexts/FiltersConxtext";
import { useContext, useEffect, useState } from "react";

export default function MobileFilter(props) {
  //   Contextos
  const { professionalsAPI, setFilteredData } =
    useContext(ProfessionalsContext);
  const { statesAPI } = useContext(StatesContext);
  const { setStateName, citiesAPI } = useContext(CitiesContext);
  const { specialtiesAPI } = useContext(FiltersContext);

  //Botões e Dropdowns
  const [seletectButton, setSelectedButton] = useState("");
  const [selectedState, setSelectedState] = useState("Selecione o estado");
  const [selectedCity, setSelectedCity] = useState("Selecione a cidade");

  //Filters
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [type, setType] = useState("");
  const [userGender, setUserGender] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);

  function openDropdownMenuStates() {
    const dropdown = document.getElementById("dropdownStatesMobileId");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  }

  function openDropdownMenuCity() {
    const dropdown = document.getElementById("dropdownCityMobileId");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  }

  const handleSelectedState = (option) => {
    setSelectedState(option);
  };

  const handleSelectedCity = (option) => {
    setSelectedCity(option);
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    // Se clicar em "Ambos", limpar todos os valores
    if (value === "Ambos" && checked) {
      setUserGender("");
    } else if (checked) {
      // Se clicar em Masculino ou Feminino, definir o valor correspondente
      setUserGender(value);
    }
  };

  const applyFilters = () => {
    let filteredProfessionals = professionalsAPI;

    // Filtrar por estado, se selecionado
    if (state !== "") {
      filteredProfessionals = filteredProfessionals.filter(
        (professional) => professional.state === state
      );
    }

    // Filtrar por cidade, se selecionado
    if (city !== "") {
      filteredProfessionals = filteredProfessionals.filter(
        (professional) => professional.city === city
      );
    }

    // Filtrar por gênero, se selecionado
    if (userGender !== "") {
      filteredProfessionals = filteredProfessionals.filter(
        (professional) => professional.userGender === userGender
      );
    }

    // Filtrar por tipo de profissional, se selecionado
    if (type !== "") {
      filteredProfessionals = filteredProfessionals.filter(
        (professional) => professional.type === type
      );
    }

    if (selectedSkills.length > 0) {
      filteredProfessionals = filteredProfessionals.filter((professional) =>
        professional.skills.some((skill) =>
          selectedSkills.includes(skill.filterId.toString())
        )
      );
    }

    // Atualizar o estado com os resultados filtrados
    setFilteredData(filteredProfessionals);
    props.setTrigger(false);
  };

  useEffect(() => {
    console.log("Estado " + state);
    console.log("Cidade " + city);
    console.log("Tipo " + type);
    console.log("Gênero " + userGender);
  });

  const stateDropdownClick = (stateAcronym, stateName) => {
    setStateName(stateAcronym);
    setState(stateAcronym);
    handleSelectedState(stateName);
    openDropdownMenuStates();
  };

  const cityDropdownClick = (cityName) => {
    setCity(cityName);
    handleSelectedCity(cityName);
    openDropdownMenuCity();
  };

  const handleSelectedUserTypeButton = (button, type) => {
    setSelectedButton(button);
    setType(type);
  };

  const handleSkillChange = (event) => {
    const { value } = event.target;

    if (event.target.checked) {
      setSelectedSkills([...selectedSkills, value]);
      console.log(selectedSkills);
    } else {
      setSelectedSkills(selectedSkills.filter((id) => id !== value));
      console.log(selectedSkills);
    }
  };

  return props.trigger ? (
    <>
      <div className="main-filter-content">
        <div className="filter-top-bar">
          <span>Filtros Avançados</span>
          <button
            onClick={() => props.setTrigger(false)}
            className="login-button"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="filters-container-mobile">
          <div className="filters-section location-filters location-filters-mobile">
            <span className="default-span mobile-filter-span">Localização</span>
            <div className="default-dropdown-menu filters-dropdown-menu filters-dropdown-menu-mobile">
              <button
                type="button"
                className="default-dropdown-button mobile-dropdown-button"
                onClick={openDropdownMenuStates}
              >
                {selectedState}
                <span className="material-symbols-outlined">expand_more</span>
              </button>
              <div
                className="default-dropdown-content location-dropdown-content location-dropdown-content-mobile"
                id="dropdownStatesMobileId"
              >
                {statesAPI.length > 0 ? (
                  statesAPI.map((statesAPI) => (
                    <div key={statesAPI.sigla}>
                      <ul className="dropdown-ul">
                        <li
                          className="dropdown-li location-filters-dropdown-li"
                          onClick={() => {
                            stateDropdownClick(statesAPI.sigla, statesAPI.nome);
                          }}
                        >
                          <span className="dropdown-span default-span">
                            {statesAPI.nome}
                          </span>
                        </li>
                      </ul>
                    </div>
                  ))
                ) : (
                  <div>
                    <ul className="dropdown-ul">
                      <li className="dropdown-li location-filters-dropdown-li">
                        <span className="default-span"></span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
              <div className="default-dropdown-menu filters-dropdown-menu filters-dropdown-menu-mobile">
                <button
                  className="default-dropdown-button mobile-dropdown-button"
                  onClick={openDropdownMenuCity}
                >
                  {selectedCity}
                  <span className="material-symbols-outlined">expand_more</span>
                </button>
                <div
                  className="default-dropdown-content location-dropdown-content location-dropdown-content-mobile"
                  id="dropdownCityMobileId"
                >
                  {citiesAPI.length > 0 ? (
                    citiesAPI.map((citiesAPI) => (
                      <div key={citiesAPI.codigo_ibge}>
                        <ul className="dropdown-ul">
                          <li
                            className="dropdown-li"
                            onClick={() => {
                              cityDropdownClick(citiesAPI.nome);
                            }}
                          >
                            <span className="dropdown-span default-span">
                              {citiesAPI.nome}
                            </span>
                          </li>
                        </ul>
                      </div>
                    ))
                  ) : (
                    <div>
                      <ul className="dropdown-ul">
                        <li className="dropdown-li">
                          <span className="default-span">
                            Nenhuma cidade encontrada
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="filters-section filters-button-section filters-button-section-mobile">
            <span className="default-span mobile-filter-span">
              Escolha o Professional
            </span>
            <div className="filters-section filters-button-section filters-button-section-mobile filters-dropdown-menu-mobile">
              <button
                className={`white-btn mobile-dropdown-button ${
                  seletectButton === "button1" ? "selected-filter-button" : ""
                }`}
                onClick={() => {
                  handleSelectedUserTypeButton("button1", "");
                }}
              >
                Todos
              </button>
              <button
                className={`white-btn mobile-dropdown-button ${
                  seletectButton === "button2" ? "selected-filter-button" : ""
                }`}
                onClick={() => {
                  handleSelectedUserTypeButton("button2", "TATTOO");
                }}
              >
                Tatuador
              </button>
              <button
                className={`white-btn mobile-dropdown-button ${
                  seletectButton === "button3" ? "selected-filter-button" : ""
                }`}
                onClick={() => {
                  handleSelectedUserTypeButton("button3", "PIERCER");
                }}
              >
                Body Piercer
              </button>
            </div>
          </div>
          <div className="filters-section gender-filters gender-filters-mobile">
            <span className="filters-span default-span mobile-span">
              Gênero
            </span>
            <ul className="filters-ul mobile-filter-ul">
              <li>
                <input
                  className="checkbox-round"
                  type="checkbox"
                  id="ambos"
                  name="gender"
                  value={"Ambos"}
                  checked={userGender === ""}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="tatuador">Ambos</label>
              </li>
              <li>
                <input
                  className="checkbox-round"
                  type="checkbox"
                  id="tatuador"
                  name="gender"
                  value={"MASCULINO"}
                  checked={userGender === "MASCULINO"}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="tatuador">Tatuador</label>
              </li>
              <li>
                <input
                  className="checkbox-round"
                  type="checkbox"
                  id="tatuador"
                  name="gender"
                  value={"FEMININO"}
                  checked={userGender === "FEMININO"}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="tatuador">Tatuadora</label>
              </li>
            </ul>
          </div>
          <div className="filters-section tattoo-filters filters-ul-mobile">
            <span className="default-span mobile-span">Temas de tatuagem</span>
            <ul className="filters-ul mobile-filter-ul">
              {specialtiesAPI.length > 0 ? (
                specialtiesAPI.map((skill) => (
                  <div key={skill.filterId}>
                    <li>
                      <input
                        className="checkbox-round"
                        type="checkbox"
                        id={skill.filterName}
                        name="filters-input"
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
                <span className="filters-span">Nenhum filtro encontrado</span>
              )}
            </ul>
          </div>
          <div className="center-button">
            <button className="btn apply-button" onClick={applyFilters}>
              Aplicar
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    ""
  );
}
