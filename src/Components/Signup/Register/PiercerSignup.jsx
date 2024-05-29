import "../../../Styles/Components/Auth/SigninScreen.css";
import "../../../Styles/Components/Auth/Login.css";

import { useContext, useEffect, useState } from "react";
import { SignupFormContext } from "../../../Contexts/SignupLoginFormContext";
import { StatesContext } from "../../../Contexts/StatesContext";
import { CitiesContext } from "../../../Contexts/CitiesContext";

export default function PiercerSignup(props) {
  const { signupFormData, handleInputChange, signupUser } =
    useContext(SignupFormContext);
  const { statesAPI } = useContext(StatesContext);
  const { setStateName, citiesAPI } = useContext(CitiesContext);

  const [selectedState, setSelectedState] = useState("Seu estado");
  const [selectedCity, setSelectedCity] = useState("Sua cidade");

  const [isTermsCheckboxCheckboxChecked, setIsTermsCheckboxChecked] =
    useState(false);

  const handleTermsCheckbox = () => {
    setIsTermsCheckboxChecked(!isTermsCheckboxCheckboxChecked);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    signupUser();
  };

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

  const cityDropdownClick = (cityName) => {
    handleInputChange(null, "address.city", cityName);
    handleSelectedCity(cityName);
    openDropdownMenuCity();
  };

  useEffect(() => {
    console.log(signupFormData);
  }, [signupFormData]);

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

  function openDropdownMenuGenders() {
    const dropdown = document.getElementById("dropdownGendersId");
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "block";
    } else {
      dropdown.style.display = "none";
    }
  }

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
                <label htmlFor="passowrd">Senha</label>
                <input
                  type="password"
                  className="default-input signup-screen-input"
                  placeholder="********"
                  value={signupFormData.password}
                  name="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="login-fields login-fields-location">
                <div className="default-dropdown-menu signup-location-dropdown-menu">
                  <button
                    type="button"
                    className="default-dropdown-button signup-location-dropdown-button"
                    onClick={openDropdownMenuStates}
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
                <div className="default-dropdown-menu signup-location-dropdown-menu mobile-dropdown-location">
                  <button
                    className="default-dropdown-button signup-location-dropdown-button mobile-dropdown-location"
                    onClick={openDropdownMenuCity}
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
              <div className="login-fields">
                <div className="default-dropdown-menu signup-dropdown-menu">
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
                  <div
                    className="default-dropdown-content signup-dropdown-content gender-dropdown-content"
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
                              {signupFormData.userGender === gender}
                            </span>
                          </li>
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="login-fields terms-fields">
                <input
                  type="checkbox"
                  checked={!isTermsCheckboxCheckboxChecked}
                  onChange={handleTermsCheckbox}
                />
                <label>
                  Ao se cadastrar no LISTTTA, você aceita com os
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
              <div className="signup-button-bottom">
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
