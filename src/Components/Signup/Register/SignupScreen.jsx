import "../../../Styles/Components/Auth/SignupScreen.css";
import { useContext, useEffect, useState } from "react";
import { SignupFormContext } from "../../../Contexts/SignupLoginFormContext";
import { StatesContext } from "../../../Contexts/StatesContext";
import { CitiesContext } from "../../../Contexts/CitiesContext";
import { FiltersContext } from "../../../Contexts/FiltersConxtext";
import { AuthContext } from "../../../Contexts/AuthContext";
import Cookies from "js-cookie";

export default function SignupScreen(props) {
  const { signupFormData, handleInputChange, handleSkillChange, signupUser } =
    useContext(SignupFormContext);

  const { handleLoginInputChange, login } = useContext(AuthContext);

  const { statesAPI } = useContext(StatesContext);
  const { setStateName, citiesAPI } = useContext(CitiesContext);
  const { specialtiesAPI } = useContext(FiltersContext);

  const [selectedState, setSelectedState] = useState("Seu estado");
  const [selectedCity, setSelectedCity] = useState("Sua cidade");

  const [isTermsCheckboxCheckboxChecked, setIsTermsCheckboxChecked] =
    useState(false);

  const handleTermsCheckbox = () => {
    setIsTermsCheckboxChecked(!isTermsCheckboxCheckboxChecked);
  };

  const handleSelectedState = (option) => {
    setSelectedState(option);
  };

  const handleSelectedCity = (option) => {
    setSelectedCity(option);
  };

  const stateDropdownClick = (stateAcronym, stateName) => {
    setStateName(stateAcronym);
    handleInputChange(null, "addressDto.state", stateAcronym);
    handleSelectedState(stateName);
    openDropdownMenuStates();
  };

  const toogleSkillsDropdown = () => {
    openDropdownMenuSkills();
  };

  const cityDropdownClick = (cityName) => {
    handleInputChange(null, "addressDto.city", cityName);
    handleSelectedCity(cityName);
    openDropdownMenuCity();
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    await signupUser();
    const loginNewUser = await login();

    if (loginNewUser.status == 200 && signupFormData.role == "PROFESSIONAL") {
      const userPuid = Cookies.get("PUID");
      console.log(userPuid);
      window.location.href = `/profile/${userPuid}`;
    } else if (loginNewUser.status == 200 && signupFormData.role == "USER") {
      window.location.href = "/search";
    }
  };

  useEffect(() => {
    displaySkillsMenu();
    console.log(signupFormData);
  }, [signupFormData.professionalsDto.type, handleInputChange]);

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
    handleInputChange(null, "gender", gender);
  };


  const displaySkillsMenu = () => {
    const skillsSection = document.getElementById("skillsSection");
    if (signupFormData.professionalsDto.type === "TATTOO") {
      skillsSection.style.display = "block";
    } else {
      skillsSection.style.display = "none";
    }
  };

  const handleCombinedInputChange = (e, field) => {
    handleInputChange(e, field);
    handleLoginInputChange(e, field);
  };

  const isSkillsSelected = signupFormData.professionalsDto.skills.length > 0;

  return props.trigger ? (
    <div className="signin-container">
      <div className="signin-popup signup-">
        <button
          className="signin-close-button"
          onClick={() => props.setTrigger(false)}
        >
          <span className="material-symbols-outlined arrow-span">
            arrow_back
          </span>
        </button>
        <div className="signin-screen-container signup-screen-container">
          <div className="signup-form">
            <form onSubmit={handleSignupSubmit}>
              <div className="signup-fields">
                <label htmlFor="email" className="singup-inputs-labels">
                  Email
                </label>
                <input
                  type="email"
                  className="default-input signup-input"
                  placeholder="john@gmail.com"
                  value={signupFormData.email}
                  name="email"
                  onChange={(e) => handleCombinedInputChange(e, "email")}
                />
              </div>
              <div className="signup-fields">
                <label htmlFor="password" className="singup-inputs-labels">
                  Senha
                </label>
                <input
                  type="password"
                  className="default-input signup-input"
                  placeholder="**********"
                  value={signupFormData.password}
                  name="password"
                  onChange={(e) => handleCombinedInputChange(e, "password")}
                />
              </div>
              <div className="signup-fields signup-fields-location">
                <div className="default-dropdown-menu signup-location-dropdown-menu ">
                  <button
                    type="button"
                    className="default-dropdown-button signup-dropdown-button signup-location-dropdown-button"
                    onClick={(e) => {
                      e.preventDefault();
                      openDropdownMenuStates();
                    }}
                  >
                    {selectedState}
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                  <div
                    className="default-dropdown-content signup-location-dropdown-content"
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
                <div className="default-dropdown-menu signup-location-dropdown-menu">
                  <button
                    className="default-dropdown-button signup-dropdown-button signup-location-dropdown-button"
                    onClick={(e) => {
                      e.preventDefault();
                      openDropdownMenuCity();
                    }}
                  >
                    {selectedCity}
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                  <div
                    className="default-dropdown-content signup-location-dropdown-content"
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
              <div className="signup-fields">
                <div className="default-dropdown-menu signup-dropdown-menu signup-large-dropdown-menu">
                  <button
                    type="button"
                    className="default-dropdown-button signup-dropdown-button signup-large-dropdown-button"
                    onClick={openDropdownMenuGenders}
                  >
                    {signupFormData.gender || "Gênero"}
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </button>
                  <div
                    className="default-dropdown-content signup-dropdown-content signup-large-dropdown-content signup-genders-dropdown-content"
                    id="dropdownGendersId"
                  >
                    {genders.map((gender) => (
                      <div key={gender}>
                        <ul className="dropdown-ul">
                          <li
                            className="dropdown-li"
                            onClick={() => handleGenderChange(gender)}
                          >
                            <span className="dropdown-span default-span">
                              {gender}
                              {signupFormData.gender === gender}
                            </span>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="signup-fields">
                <div
                  className="default-dropdown-menu signup-dropdown-menu signup-large-dropdown-menu"
                  id="skillsSection"
                >
                  <button
                    type="button"
                    className={`default-dropdown-button signup-dropdown-button signup-large-dropdown-button ${
                      isSkillsSelected ? "selected-skills" : ""
                    }`}
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
                    className="default-dropdown-content signup-dropdown-content signup-large-dropdown-content"
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
                              Sem Especialidades
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="signup-fields terms-fields">
                <input
                  type="checkbox"
                  checked={isTermsCheckboxCheckboxChecked}
                  onChange={handleTermsCheckbox}
                />
                <label>
                  Ao se cadastrar no LISTTTA, você aceita com os{" "}
                  <a href="/termos-condicoes#useterms" target="_blank">
                    Termos de uso
                  </a>{" "}
                  e{" "}
                  <a href="/termos-condicoes#privacidade" target="_blank">
                    Privacidade
                  </a>{" "}
                  do site.
                </label>
              </div>
              <div className="signup-register-button">
                <button
                  type="submit"
                  className="btn"
                  disabled={!isTermsCheckboxCheckboxChecked}
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}
