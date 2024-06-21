import "../Styles/Pages/Profile.css";
import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import "../Styles/Pages/Profile.css";
import { useEffect, useRef, useState } from "react";
import { variables } from "../Variables.jsx";
import axios from "axios";
import { useParams } from "react-router-dom";
import TattooStyles from "../Components/Profile/TattoStyles.jsx";
import EditableFields from "../Components/Profile/EditableFIelds.jsx";
import EditableInstagramUrl from "../Components/Profile/EditableInstagram.jsx";
import EditableAddress from "../Components/Profile/EditableLocationFields.jsx";

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const { puid } = useParams();

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
    console.log(`updateForm`, updateForm);
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
          <EditableFields
            label='fullName'
            value={updateForm.fullName}
            fieldName='fullname'
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            updateForm={updateForm}
            setUpdateForm={setUpdateForm}
            placeholder='Seu Nome'
          />

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
          <EditableAddress
            city={userData.Data.address.city}
            state={userData.Data.address.state}
            fieldNameCity='address.city'
            fieldNameState='address.state'
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            updateForm={updateForm}
            setUpdateForm={setUpdateForm}
          />
          <EditableInstagramUrl
            value={userData.Data.professionalsDetails.instagramUrl}
            fieldName='instagramUrl'
            fieldTitle='Instagram'
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            updateForm={updateForm}
            setUpdateForm={setUpdateForm}
            placeholder='@Seu_Instagram'
          />
        </div>
        <div className='complement-info'>
          <div className='contact-info'>
            <div className='profile-block-title'>
              <h1>Contato</h1>
            </div>
            <EditableFields
              label='phoneNumber'
              value={updateForm.phoneNumber}
              fieldName='phoneNumber'
              fieldTitle='Celular'
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              updateForm={updateForm}
              setUpdateForm={setUpdateForm}
              placeholder='(00) 0000-0000'
            />
            <EditableFields
              label='whatsappContact'
              value={updateForm.whatsappContact}
              fieldName='whatsappContact'
              fieldTitle='WhatsApp'
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              updateForm={updateForm}
              setUpdateForm={setUpdateForm}
              placeholder='(00) 0000-0000'
            />
            <EditableFields
              label='email'
              value={updateForm.email}
              fieldName='email'
              fieldTitle='Email'
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              updateForm={updateForm}
              setUpdateForm={setUpdateForm}
              placeholder='nome@gmail.com'
            />
            <EditableFields
              label='CPF ou CNPJ'
              value={updateForm.taxNumber}
              fieldName='taxNumber'
              fieldTitle='CPF/CNPJ'
              isEditing={isEditing}
              setIsEditing={setIsEditing}
              updateForm={updateForm}
              setUpdateForm={setUpdateForm}
              placeholder='000.000.000-00'
            />
          </div>
          {userData.Data.professionalsDetails.type == "TATTOO" ? (
            <TattooStyles
              skills={updateForm.professionalsDetails.skills}
              setSkills={(newSkills) => {
                setUpdateForm((prevState) => ({
                  ...prevState,
                  professionalsDetails: {
                    ...prevState.professionalsDetails,
                    skills: newSkills,
                  },
                }));
              }}
              initialSkills={userData.Data.professionalsDetails.skills}
            />
          ) : (
            ""
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
