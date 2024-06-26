import { useState } from "react";

const EditableInstagramUrl = ({
  value,
  fieldName,
  fieldTitle,
  isEditing,
  setIsEditing,
  updateForm,
  setUpdateForm,
  placeholder,
  userData,
}) => {
  const [localValue, setLocalValue] = useState(value || "");

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
  };

  const handleEditClick = () => {
    setIsEditing((prevState) => ({
      ...prevState,
      professionalsDetails: {
        ...prevState.professionalsDetails,
        [fieldName]: true,
      },
    }));
  };

  const handleSaveClick = () => {
    setUpdateForm((prevState) => ({
      ...prevState,
      professionalsDetails: {
        ...prevState.professionalsDetails,
        [fieldName]: localValue,
      },
    }));

    setIsEditing((prevState) => ({
      ...prevState,
      professionalsDetails: {
        ...prevState.professionalsDetails,
        [fieldName]: false,
      },
    }));
  };

  const placeholderValue = placeholder || `@${fieldTitle}`;
  const instgramUsername =
    updateForm.professionalsDetails[fieldName] || userData.Data.instagramUrl;

  return (
    <div className='profile-input'>
      {isEditing.professionalsDetails[fieldName] ? (
        <>
          <input
            type='text'
            className='profile-input-edit'
            value={localValue}
            onChange={handleChange}
            placeholder={placeholderValue}
          />
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
            <strong>{fieldTitle}:</strong>{" "}
            <a
              href={`https://instagram.com/${instgramUsername}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              @{instgramUsername || "user"}
            </a>
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

export default EditableInstagramUrl;
