import { useContext, useState } from "react";
import "../../Styles/Components/Filters/MainSearchFilter.css";
import { StatesContext } from "../../Contexts/StatesContext";
import { CitiesContext } from "../../Contexts/CitiesContext";
import { FiltersContext } from "../../Contexts/FiltersConxtext";
import { ProfessionalsContext } from "../../Contexts/ProfessionalsContext";

export default function MainSearchFilter() {
  const { professionalsAPI, filteredData, setFilteredData } = useContext(ProfessionalsContext);

  const { statesAPI } = useContext(StatesContext);
  const { stateName, setStateName, citiesAPI } = useContext(CitiesContext);
  const { specialtiesAPI } = useContext(FiltersContext);

  const [seletectButton, setSelectedButton] = useState("");
  const [selectedState, setSelectedState] = useState("Selecione o estado");
  const [selectedCity, setSelectedCity] = useState("Selecione a cidade");

  //   const [filters, setFilters] = useState([]);
  const filterState = stateName;
  const filterCity = selectedCity;
  const [filterGender, setFilterGender] = useState("");
  const [filterUserType, setFilterUserType] = useState("");

  const handleProfessionalTypeButtoClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

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
      setFilterGender("");
    } else if (checked) {
      // Se clicar em Masculino ou Feminino, definir o valor correspondente
      setFilterGender(value);
    }
  };

  const applyFilters = () => {
    let filteredProfessionals = professionalsAPI;

    if (filterState !== "") {
      filteredProfessionals = filteredProfessionals.filter(
        (professional) => professional.state === filterState
      );
    }

    if (filterCity !== "") {
      filteredProfessionals = filteredProfessionals.filter(
        (professional) => professional.city === filterCity
      );
    }

    if (filterGender !== "") {
      filteredProfessionals = filteredProfessionals.filter(
        (professional) => professional.userGender === filterGender
      );
    }

    if (filterUserType !== "") {
      filteredProfessionals = filteredProfessionals.filter(
        (professional) => professional.type === filterUserType
      );
    }

    setFilteredData(filteredProfessionals);
    console.log(filteredData);
    console.log(professionalsAPI);
  };

  return (
    <div className="main-filters-container">
      <div className="filters-section filters-button-section">
        <button
          className={`white-btn ${
            seletectButton === "button1" ? "selected-filter-button" : ""
          }`}
          onClick={() => {
            handleProfessionalTypeButtoClick("button1");
            setFilterUserType("");
            console.log(filterUserType);
          }}
        >
          Todos
        </button>
        <button
          className={`white-btn ${
            seletectButton === "button2" ? "selected-filter-button" : ""
          }`}
          onClick={() => {
            handleProfessionalTypeButtoClick("button2");
            setFilterUserType("TATTOO");
            console.log(filterUserType);
          }}
        >
          Tatuador
        </button>
        <button
          className={`white-btn ${
            seletectButton === "button3" ? "selected-filter-button" : ""
          }`}
          onClick={() => {
            handleProfessionalTypeButtoClick("button3");
            setFilterUserType("PIERCER");
            console.log(filterUserType);
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
                        setStateName(statesAPI.sigla);
                        handleSelectedState(statesAPI.nome);
                        openDropdownMenuStates();
                        console.log(filterState);
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
                        handleSelectedCity(citiesAPI.nome);
                        openDropdownMenuCity();
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
                id="tatuador"
                name="gender"
                value={"Ambos"}
                checked={filterGender === ""}
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
                checked={filterGender === "MASCULINO"}
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
                checked={filterGender === "FEMININO"}
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
              specialtiesAPI.map((specialtiesAPI) => (
                <div key={specialtiesAPI.filterId}>
                  <li>
                    <input
                      className="checkbox-round"
                      type="checkbox"
                      id={specialtiesAPI.filterName}
                      name="filters-input"
                    />
                    <label htmlFor={specialtiesAPI.filterName}>
                      {specialtiesAPI.displayName}
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
      <div>
        <button onClick={applyFilters}>aplicar</button>
      </div>
    </div>
  );
}
