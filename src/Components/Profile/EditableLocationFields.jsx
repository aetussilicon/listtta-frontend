import { useState } from "react";

const cityZones = [
  { label: "Sul", value: "ZONA_SUL" },
  { label: "Norte", value: "ZONA_NORTE" },
  { label: "Leste", value: "ZONA_LESTE" },
  { label: "Oeste", value: "ZONA_OESTE" },
  { label: "Centro", value: "CENTRO" },
];

const EditableAddress = ({
  fieldNameCityZone,
  isEditing,
  setIsEditing,
  updateForm,
  setUpdateForm,
  userData,
}) => {
  const [localCityZone, setLocalCityZone] = useState(
    userData.Data.address.cityZone || ""
  );

  const handleChange = (e) => {
    const { value } = e.target;
    setLocalCityZone(value);
    setUpdateForm((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        cityZone: value,
      },
    }));
  };

  const handleEditClick = () => {
    setIsEditing((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        cityZone: true,
      },
    }));
  };

  const handleSaveClick = () => {
    setUpdateForm((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        cityZone: localCityZone,
      },
    }));

    setIsEditing((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        cityZone: false,
      },
    }));
  };

  const getCityZoneLabel = (value) => {
    const zone = cityZones.find((zone) => zone.value === value);
    return zone ? zone.label : userData.Data.address.cityZone;
  };

  return (
    <div className='profile-input'>
      {isEditing.address.cityZone ? (
        <>
          <select
            name={fieldNameCityZone}
            value={localCityZone}
            onChange={handleChange}
            className='location-menu'
          >
            <option value=''>Selecione a Zona</option>
            {cityZones.map((zone) => (
              <option
                key={zone.value}
                value={zone.value}
                className='location-option'
              >
                {zone.label}
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
          <p className='profile-input-address.cityZone'>
            <strong>{fieldNameCityZone} </strong>
            {getCityZoneLabel(updateForm.address.cityZone)}
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
