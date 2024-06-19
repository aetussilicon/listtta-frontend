import "../Styles/Pages/Profile.css";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import "../Styles/Pages/Profile.css";
import { useContext, useEffect, useRef, useState } from "react";
import { variables } from "../Variables.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StatesContext } from "../Contexts/StatesContext.jsx";
import { CitiesContext } from "../Contexts/CitiesContext.jsx";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const { puid } = useParams();

  const { statesAPI } = useContext(StatesContext);
  const { stateName, setStateName, citiesAPI } = useContext(CitiesContext);

  const [isEditing, setIsEditing] = useState({
    fullName: false,
    profilePicture: false,
    userGender: false,
    taxNumber: false,
    email: false,
    phoneNumber: false,
    whatsappContact: false,
    address: {
      state: false,
      city: false,
    },
    professionalsDetails: {
      type: false,
      instagramUrl: false,
      skills: false,
    },
  });

  const [updateForm, setUpdateForm] = useState({
    fullName: "",
    profilePicture: "",
    userGener: "",
    taxNumber: "",
    email: "",
    phoneNumber: "",
    whatsappContact: "",
    address: {
      state: "",
      city: "",
    },
    professionalsDetails: {
      type: "",
      instagramUrl: "",
      skills: [],
    },
  });

  const fileInputRef = useRef(null);

  useEffect(() => {
    console.log(updateForm);
    console.log(stateName);
  });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios.get(
          `${variables.localhost}/professionals/list/${puid}`
        );
        const result = await response.data;
        setUserData(result);

        if (result && result.Data) {
          setUpdateForm({
            fullName: result.Data.fullName || "",
            profilePicture: result.Data.profilePicture64 || "",
            userGender: result.Data.userGender || "",
            taxNumber: result.Data.taxNumber || "",
            email: result.Data.email || "",
            phoneNumber: result.Data.phoneNumber || "",
            whatsappContact: result.Data.whatsappContact || "",
            address: {
              state: result.Data.address.state || "",
              city: result.Data.address.city || "",
            },
            professionalsDetails: {
              type: result.Data.professionalsDetails.type || "",
              instagramUrl: result.Data.professionalsDetails.instagramUrl || "",
              skills: result.Data.professionalsDetails.skills || [],
            },
          });
        }
        console.log(result);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, [puid]);

  const changeUpdateFormInputs = (e) => {
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

      if (addressField === "state") {
        setStateName(value);
      }
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

  const getAtributte = (name, placeholder) => {
    return name || placeholder;
  };

  const editInputText = (field) => {
    setIsEditing((prevState) => {
      if (field.includes("address.")) {
        const addressField = field.split(".")[1];
        return {
          ...prevState,
          address: {
            ...prevState.address,
            [addressField]: true,
          },
        };
      } else if (field.includes("professionalsDetails.")) {
        const detailsField = field.split(".")[1];
        return {
          ...prevState,
          professionalsDetails: {
            ...prevState.professionalsDetails,
            [detailsField]: true,
          },
        };
      } else {
        return {
          ...prevState,
          [field]: true,
        };
      }
    });
  };

  const saveEditedText = (field) => {
    setUserData((prevData) => {
      let newData = { ...prevData };

      if (field.includes("address.")) {
        const addressField = field.split(".")[1];
        newData.Data.address[addressField] = updateForm.address[addressField];
      } else if (field.includes("professionalsDetails.")) {
        const detailsField = field.split(".")[1];
        newData.Data.professionalsDetails[detailsField] =
          updateForm.professionalsDetails[detailsField];
      } else {
        newData.Data[field] = updateForm[field];
      }

      return newData;
    });

    setIsEditing((prevState) => {
      if (field.includes("address.")) {
        const addressField = field.split(".")[1];
        return {
          ...prevState,
          address: {
            ...prevState.address,
            [addressField]: false,
          },
        };
      } else if (field.includes("professionalsDetails.")) {
        const detailsField = field.split(".")[1];
        return {
          ...prevState,
          professionalsDetails: {
            ...prevState.professionalsDetails,
            [detailsField]: false,
          },
        };
      } else {
        return {
          ...prevState,
          [field]: false,
        };
      }
    });
  };

  if (!userData) {
    return <div>Carregando...</div>;
  }

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prevData) => ({
          ...prevData,
          profilePicture: reader.result,
        }));
        setUpdateForm((prevForm) => ({
          ...prevForm,
          profilePicture: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Header />
      <div className='container profile-container'>
        <div className='base-info'>
          <div className='base-info-top-bar'>
            <div className='profile-input'>
              {isEditing.fullName ? (
                <>
                  <input
                    type='text'
                    name='fullName'
                    value={updateForm.fullName}
                    onChange={changeUpdateFormInputs}
                    placeholder='Nome de exibição'
                  />
                  <span
                    className='material-symbols-outlined edit-button'
                    onClick={() => saveEditedText("fullName")}
                  >
                    download_done
                  </span>
                </>
              ) : (
                <>
                  <p>
                    {userData
                      ? getAtributte(userData.Data.fullName, "Nome de exibição")
                      : "Carregando..."}
                  </p>
                  <span
                    className='material-symbols-outlined edit-button'
                    onClick={() => editInputText("fullName")}
                  >
                    border_color
                  </span>
                </>
              )}
            </div>
            <div className='profile-input profile-image-input'>
              <div
                className='profile-image-placeholder'
                onClick={handleDivClick}
                style={{
                  backgroundImage: `url(${
                    userData.Data.profilePictureMimeType &&
                    userData.Data.profilePicture64
                      ? `data:${userData.Data.profilePictureMimeType};base64,${userData.Data.profilePicture64}`
                      : "/Assets/imgs/cards/choose-picture.png"
                  })`,
                }}
              >
                <input
                  type='file'
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>
          <div className='base-info-bottom'>
            <div className='location-info'>
              <div className='profile-input'>
                {isEditing.address.city && isEditing.address.state ? (
                  <>
                    <select
                      name='address.city'
                      value={updateForm.address.city}
                      onChange={changeUpdateFormInputs}
                    >
                      <option value=''>Cidade</option>
                      {citiesAPI.map((city) => (
                        <option key={city.codigo_ibge} value={city.nome}>
                          {city.nome}
                        </option>
                      ))}
                    </select>
                    <select
                      name='address.state'
                      value={updateForm.address.state}
                      onChange={changeUpdateFormInputs}
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
                      onClick={() => {
                        saveEditedText("address.city");
                        saveEditedText("address.state");
                      }}
                    >
                      download_done
                    </span>
                  </>
                ) : (
                  <>
                    <p>
                      <strong>Local: </strong>
                      {userData
                        ? getAtributte(userData.Data.address.city, "Cidade")
                        : "Carregando..."}{" "}
                      /{" "}
                      {userData
                        ? getAtributte(userData.Data.address.state, "Estado")
                        : "Carregando..."}
                    </p>
                    <span
                      className='material-symbols-outlined edit-button'
                      onClick={() => {
                        editInputText("address.city");
                        editInputText("address.state");
                      }}
                    >
                      border_color
                    </span>
                  </>
                )}
              </div>
            </div>
            <div className='profile-input'>
              {isEditing.professionalsDetails.instagramUrl ? (
                <>
                  <input
                    type='text'
                    name='professionalsDetails.instagramUrl'
                    value={updateForm.professionalsDetails.instagramUrl}
                    onChange={changeUpdateFormInputs}
                    placeholder='@Seu_Instagram'
                  />
                  <span
                    className='material-symbols-outlined edit-button'
                    onClick={() =>
                      saveEditedText("professionalsDetails.instagramUrl")
                    }
                  >
                    download_done
                  </span>
                </>
              ) : (
                <>
                  <p>
                    <a
                      href={`https://instagram.com/${userData.Data.professionalsDetails.instagramUrl}`}
                    >
                      @
                      {userData
                        ? getAtributte(
                            userData.Data.professionalsDetails.instagramUrl,
                            "Seu_Instagram"
                          )
                        : "Carregando..."}
                    </a>
                  </p>
                  <span
                    className='material-symbols-outlined edit-button'
                    onClick={() =>
                      editInputText("professionalsDetails.instagramUrl")
                    }
                  >
                    border_color
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
