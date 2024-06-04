import { useContext, useEffect, useState } from "react";
import "../../Styles/Components/Filters/MainSearchFilter.css";
import { StatesContext } from "../../Contexts/StatesContext";
import { CitiesContext } from "../../Contexts/CitiesContext";
import { FiltersContext } from "../../Contexts/FiltersConxtext";
import { ProfessionalsContext } from "../../Contexts/ProfessionalsContext";

export default function MainSearchFilter() {
  //Contextos
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

  useEffect(() => {
    applyFilters();
  }, [state, city, seletectButton, type, userGender, selectedSkills]);

  function openDropdownMenuStates() {
    const dropdown = document.getElementById("dropdownStatesId");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  }

  function openDropdownMenuCity() {
    const dropdown = document.getElementById("dropdownCityId");
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
  };

  // useEffect(() => {
  //   console.log("Estado " + state);
  //   console.log("Cidade " + city);
  //   console.log("Tipo " + type);
  //   console.log("Gênero " + userGender);
  // });

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
    } else {
      setSelectedSkills(selectedSkills.filter((id) => id !== value)); 
    }
  };

  return (
    <div className="main-filters-container">
      <div className="filters-section filters-button-section">
        <button
          className={`white-btn ${
            seletectButton === "button1" ? "selected-filter-button" : ""
          }`}
          onClick={() => {
            handleSelectedUserTypeButton("button1", "");
          }}
        >
          Todos
        </button>
        <button
          className={`white-btn ${
            seletectButton === "button2" ? "selected-filter-button" : ""
          }`}
          onClick={() => {
            handleSelectedUserTypeButton("button2", "TATTOO");
          }}
        >
          Tatuador
        </button>
        <button
          className={`white-btn ${
            seletectButton === "button3" ? "selected-filter-button" : ""
          }`}
          onClick={() => {
            handleSelectedUserTypeButton("button3", "PIERCER");
          }}
        >
          Body Piercer
        </button>
      </div>
      <div className="filters-section location-filters">
        <span className="default-span location-filters-span">Localização</span>
        <div className="default-dropdown-menu filters-dropdown-menu">
          <button
            type="button"
            className="default-dropdown-button"
            onClick={openDropdownMenuStates}
          >
            {selectedState}
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          <div
            className="default-dropdown-content location-dropdown-content"
            id="dropdownStatesId"
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
        </div>
        <div className="default-dropdown-menu filters-dropdown-menu">
          <button
            className="default-dropdown-button"
            onClick={openDropdownMenuCity}
          >
            {selectedCity}
            <span className="material-symbols-outlined">expand_more</span>
          </button>
          <div
            className="default-dropdown-content location-dropdown-content"
            id="dropdownCityId"
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
      <div className="filters-section gender-filters">
        <span className="filters-span default-span">Gênero</span>
        <form action="">
          <ul className="filters-ul">
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
        </form>
      </div>
      <div className="filters-section tattoo-filters">
        <span className="default-span filters-span">Temas de tatuagem</span>
        <form action="">
          <ul className="filters-ul">
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
        </form>
      </div>
    </div>
  );
}
