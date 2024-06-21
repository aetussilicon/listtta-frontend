import { useState, useContext } from "react";
import { StatesContext } from "../../Contexts/StatesContext";
import { CitiesContext } from "../../Contexts/CitiesContext";

const EditableAddress = ({
  city,
  state,
  fieldNameCity,
  fieldNameState,
  isEditing,
  setIsEditing,
  updateForm,
  setUpdateForm,
}) => {
  const { statesAPI } = useContext(StatesContext);
  const { setStateName, citiesAPI } = useContext(CitiesContext);

  const [localCity, setLocalCity] = useState(city || "");
  const [localState, setLocalState] = useState(state || "");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === fieldNameCity) {
      setLocalCity(value);
      setUpdateForm((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          city: value,
        },
      }));
    } else if (name === fieldNameState) {
      setLocalState(value);
      setUpdateForm((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          state: value,
        },
      }));
      setStateName(value);
    }
  };

  const handleEditClick = () => {
    setIsEditing((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        city: true,
        state: true,
      },
    }));
  };

  const handleSaveClick = () => {
    setUpdateForm((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        city: localCity,
        state: localState,
      },
    }));

    setIsEditing((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        city: false,
        state: false,
      },
    }));
  };

  return (
    <div className='profile-input location-input'>
      {isEditing.address.city && isEditing.address.state ? (
        <>
          <select
            name={fieldNameCity}
            value={localCity}
            onChange={handleChange}
            className='location-menu'
          >
            <option value=''>Cidade</option>
            {citiesAPI.map((city) => (
              <option
                key={city.codigo_ibge}
                value={city.nome}
                className='location-option'
              >
                {city.nome}
              </option>
            ))}
          </select>
          <select
            name={fieldNameState}
            value={localState}
            onChange={handleChange}
            className='location-menu'
          >
            <option value=''>Estado</option>
            {statesAPI.map((state) => (
              <option key={state.sigla} value={state.sigla}>
                {state.nome}
              </option>
            ))}
          </select>
          <span
            className='material-symbols-outlined edit-button'
            onClick={handleSaveClick}
          >
            download_done
          </span>
        </>
      ) : (
        <>
          <p className='profile-input-bottom'>
            <strong>Local: </strong>
            {updateForm.address.city || "Carregando..."} /{" "}
            {updateForm.address.state || "Carregando..."}
          </p>
          <span
            className='material-symbols-outlined edit-button'
            onClick={handleEditClick}
          >
            border_color
          </span>
        </>
      )}
    </div>
  );
};

export default EditableAddress;
