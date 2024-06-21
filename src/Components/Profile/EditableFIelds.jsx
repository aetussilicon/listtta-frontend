const EditableFields = ({
  label,
  value,
  fieldName,
  fieldTitle,
  isEditing,
  setIsEditing,
  updateForm,
  setUpdateForm,
  placeholder,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setUpdateForm((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [addressField]: value,
        },
      }));
    } else if (name.includes("professionalsDetails.")) {
      const detailsField = name.split(".")[1];
      setUpdateForm((prevState) => ({
        ...prevState,
        professionalsDetails: {
          ...prevState.professionalsDetails,
          [detailsField]: value,
        },
      }));
    } else {
      setUpdateForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleEditClick = () => {
    setIsEditing((prevState) => ({
      ...prevState,
      [fieldName]: true,
    }));
  };

  const handleSaveClick = () => {
    setIsEditing((prevState) => ({
      ...prevState,
      [fieldName]: false,
    }));
  };

  const placeholderValue = placeholder || label;

  return (
    <div className='profile-input'>
      {isEditing[fieldName] ? (
        <>
          <input
            type='text'
            name={fieldName}
            className='profile-input-edit'
            value={updateForm[fieldName]}
            onChange={handleChange}
            placeholder={placeholderValue}
          />
          <span
            className='material-symbols-outlined edit-button'
            onClick={handleSaveClick} // Função para salvar as alterações
          >
            download_done
          </span>
        </>
      ) : (
        <>
          <p className={`profile-input-${fieldName}`}>
            <strong>{fieldTitle}</strong>{" "}
            {value || (value == undefined && value == null)
              ? value
              : placeholderValue}
          </p>
          <span
            className='material-symbols-outlined edit-button'
            onClick={handleEditClick} // Função para entrar no modo de edição
          >
            border_color
          </span>
        </>
      )}
    </div>
  );
};

export default EditableFields;
