import "../../../Styles/Components/Auth/SignupScreen.css";
import "../../../Styles/Components/Auth/Login.css";
import { useContext, useEffect, useState } from "react";
import { SignupFormContext } from "../../../Contexts/SignupLoginFormContext";
import { StatesContext } from "../../../Contexts/StatesContext";
import { CitiesContext } from "../../../Contexts/CitiesContext";
import { FiltersContext } from "../../../Contexts/FiltersConxtext";

export default function TattooSignup(props) {
  const { signupFormData, handleInputChange, handleSkillChange, signupUser } =
    useContext(SignupFormContext);

  const { statesAPI } = useContext(StatesContext);
  const { setStateName, citiesAPI } = useContext(CitiesContext);
  const { specialtiesAPI } = useContext(FiltersContext);

  const [selectedState, setSelectedState] = useState("Seu estado");
  const [selectedCity, setSelectedCity] = useState("Sua cidade");

  const handleSelectedState = (option) => {
    setSelectedState(option);
  };

  const handleSelectedCity = (option) => {
    setSelectedCity(option);
  };

  const stateDropdownClick = (stateAcronym, stateName) => {
    setStateName(stateAcronym);
    handleInputChange(null, "address.state", stateAcronym);
    handleSelectedState(stateName);
    openDropdownMenuStates();
  };

  const toogleSkillsDropdown = () => {
    openDropdownMenuSkills();
  };

  const cityDropdownClick = (cityName) => {
    handleInputChange(null, "address.city", cityName);
    handleSelectedCity(cityName);
    openDropdownMenuCity();
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signupUser();
  };

  useEffect(() => {
    console.log(signupFormData);
  }, [handleInputChange]);

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

  function openDropdownMenuSkills() {
    const dropdown = document.getElementById("dropdownSkillsId");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  }

  function openDropdownMenuGenders() {
    const dropdown = document.getElementById("dropdownGendersId");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  }

  const getSelectedSkillNames = () => {
    return specialtiesAPI
      .filter((skill) =>
        signupFormData.professionalsDto.skills.includes(skill.filterId)
      )
      .map((skill) => skill.displayName)
      .join(", ");
  };

  const genders = ["MASCULINO", "FEMININO", "OUTROS"];

  const handleGenderChange = (gender) => {
    handleInputChange(null, "userGender", gender);
  };

  return props.trigger ? (
    <div className="login-container">
      <div className="login-popup">
        <button
          className="login-close-button"
          onClick={() => props.setTrigger(false)}
        >
          <span className="material-symbols-outlined arrow-span">
            arrow_back
          </span>
        </button>
        <div className="signup-screen-container login-screen-container">
          <div className="login-form">
            <form onSubmit={handleSignupSubmit}>
              <div className="login-fields">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  className="default-input signup-screen-input"
                  placeholder="john@gmail.com"
                  value={signupFormData.email}
                  name="email"
                  onChange={handleInputChange}
                />
              </div>
              <div className="login-fields">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  className="default-input signup-screen-input"
                  placeholder="**********"
                  value={signupFormData.password}
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="login-fields login-fields-location">
                <div className="default-dropdown-menu filters-dropdown-menu signup-dropdown-menu">
                  <button
                    type="button"
                    className="default-dropdown-button signup-dropdown-button"
                    onClick={openDropdownMenuStates}
                  >
                    {selectedState}
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                  <div
                    className="default-dropdown-content location-dropdown-content signup-dropdown-content"
                    id="dropdownStatesId"
                  >
                    {statesAPI.length > 0 ? (
                      statesAPI.map((statesAPI) => (
                        <div key={statesAPI.sigla}>
                          <ul className="dropdown-ul">
                            <li
                              className="dropdown-li location-filters-dropdown-li"
                              onClick={() => {
                                stateDropdownClick(
                                  statesAPI.sigla,
                                  statesAPI.nome
                                );
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
                <div className="default-dropdown-menu filters-dropdown-menu signup-dropdown-menu">
                  <button
                    className="default-dropdown-button signup-dropdown-button"
                    onClick={openDropdownMenuCity}
                  >
                    {selectedCity}
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                  <div
                    className="default-dropdown-content location-dropdown-content signup-dropdown-content"
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
                              Nenhuma cidade encontradada
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="login-fields">
                <div className="default-dropdown-menu filters-dropdown-menu">
                  <button
                    type="button"
                    className="default-dropdown-button signup-dropdown-button"
                    onClick={openDropdownMenuGenders}
                  >
                    {signupFormData.userGender || "Gênero"}
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                  <div className="default-dropdown-content" id="dropdownGendersId">
                    {genders.map(gender => (
                      <div key={gender}>
                        <ul className="dropdown-ul">
                          <li className="dropdown-li" onClick={() => handleGenderChange(gender)}>
                          <span className="dropdown-span default-span">
                            {gender}
                            {signupFormData.userGender === gender}
                          </span>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="login-fields">
                <div className="default-dropdown-menu filters-dropdown-menu">
                  <button
                    type="button"
                    className="default-dropdown-button "
                    onClick={toogleSkillsDropdown}
                  >
                    {signupFormData.professionalsDto.skills.length > 0
                      ? getSelectedSkillNames()
                      : "Selecione as Especialidades"}
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                  <div
                    className="default-dropdown-content"
                    id="dropdownSkillsId"
                  >
                    {specialtiesAPI.length > 0 ? (
                      specialtiesAPI.map((skill) => (
                        <div key={skill.filterId}>
                          <ul className="dropdown-ul">
                            <li
                              className="dropdown-li"
                              onClick={() => handleSkillChange(skill.filterId)}
                            >
                              <span className="dropdown-span default-span">
                                {skill.displayName}
                                {signupFormData.professionalsDto.skills.includes(
                                  skill.filterId
                                ) && " ✓"}
                              </span>
                            </li>
                          </ul>
                        </div>
                      ))
                    ) : (
                      <div>
                        <ul className="dropdown-ul">
                          <li className="dropdown-li location-filters-dropdown-li">
                            <span className="default-span">
                              No skills available
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn">Registrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
