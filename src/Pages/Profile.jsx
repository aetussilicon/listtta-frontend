import '../Styles/Pages/Profile.css';
import Header from '../Components/Header/Header.jsx';
import Footer from '../Components/Footer/Footer.jsx';
import '../Styles/Pages/Profile.css';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TattooStyles from '../Components/Profile/TattoStyles.jsx';
import EditableFields from '../Components/Profile/EditableFIelds.jsx';
import EditableInstagramUrl from '../Components/Profile/EditableInstagram.jsx';
import EditableAddress from '../Components/Profile/EditableLocationFields.jsx';
import Api from '../Api.jsx';
import Cookies from 'js-cookie';
import SelectableField from "../Components/ExperienceTimeDropdown.jsx";

function createNonEmptyForm(originalForm) {
  const nonEmptyForm = {};

  // Função recursiva para verificar os campos não vazios
  const checkFields = (obj, targetObj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      // Verifica se o valor não é vazio (considerando string vazia, null, undefined e arrays vazios)
      if (
        value !== '' &&
        value !== null &&
        value !== undefined &&
        (!Array.isArray(value) || value.length > 0)
      ) {
        // Se não for vazio, verifica se é um objeto
        if (typeof value === 'object' && !Array.isArray(value)) {
          // Se for um objeto, chama a função recursivamente
          targetObj[key] = {};
          checkFields(value, targetObj[key]);
        } else {
          // Caso contrário, adiciona ao novo objeto nonEmptyForm
          targetObj[key] = value;
        }
      }
    });
  };

  // Chama a função recursiva para preencher nonEmptyForm
  checkFields(originalForm, nonEmptyForm);

  return nonEmptyForm;
}

const allowedCities = [
  'Sao paulo',
  'São paulo',
  'São Paulo',
  'sao paulo',
  'são paulo',
  'Rio de Janeiro',
  'Rio de janeiro',
  'rio de janeiro,',
  'SP',
  'sp',
  'RJ',
  'rj',
];

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const { puid } = useParams();
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      cityZone: false,
      district: false,
      street: false,
      complement: false,
      zipCode: false,
    },
    professionalsDetails: {
      type: false,
      instagramUrl: false,
      skills: false,
      experienceTime: false
    },
  });

  const [updateForm, setUpdateForm] = useState({
    fullName: '',
    userGener: '',
    taxNumber: '',
    email: '',
    phoneNumber: '',
    whatsappContact: '',
    address: {
      state: '',
      city: '',
      cityZone: '',
      district: '',
      street: '',
      complement: '',
      zipCode: '',
    },
    professionalsDetails: {
      type: '',
      instagramUrl: '',
      skills: [],
      experienceTime: ''
    },
  });

  const [profilePictureForm, setProfilePictureForm] = useState(null);

  const fileInputRef = useRef(null);

  // useEffect(() => {
  //   console.log(`updateForm`, updateForm);
  // });

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await Api.get(`/users/list/${puid}`, {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        });

        const result = await response.data;
        setUserData(result);

        // console.log(result);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (formSubmitted) {
      getUserData();
      setFormSubmitted(false);
    }

    getUserData();
  }, [puid, formSubmitted]);

  useEffect(() => {
    if (userData && userData.Data && userData.Data.address) {
      if (!allowedCities.includes(userData.Data.address.city)) {
        setUpdateForm((prevState) => ({
          ...prevState,
          address: {
            ...prevState.address,
            cityZone: null,
          },
        }));
      }
    }
  }, [userData, setUpdateForm]);

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
          Data: {
            ...prevData.Data,
            profilePicture: reader.result.split(',')[1],
            profilePictureMimeType: file.type,
          },
        }));
        setProfilePictureForm(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateUserInfo = async (e) => {
    e.preventDefault();

    const nonEmptyUpdateForm = createNonEmptyForm(updateForm);

    try {
      const updateResponse = await Api.patch(
        `/users/update/${puid}`,
        nonEmptyUpdateForm,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('authToken')}`,
          },
        }
      );
      const data = await updateResponse.data;

      if (profilePictureForm) {
        try {
          const formData = new FormData();
          formData.append('profilePicture', profilePictureForm);

          const updatePictureResponse = await Api.patch(
            `/users/update/picture/${puid}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${Cookies.get('authToken')}`,
              },
            }
          );

          const pictureData = await updatePictureResponse.data;
          // console.log(pictureData);

          // Atualiza a foto de perfil no estado userData
          setUserData((prevData) => ({
            ...prevData,
            Data: {
              ...prevData.Data,
              profilePicture: pictureData.profilePicture,
              profilePictureMimeType: pictureData.profilePictureMimeType,
            },
          }));
        } catch (error) {
          console.error('Error updating profile picture:', error);
        }
      }
      // console.log(data);
      setFormSubmitted(true);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='container profile-container'>
        <form onSubmit={updateUserInfo}>
          <section className='left-profile-block-container'>
            <div className='base-info-container'>
              <EditableFields
                label='fullName'
                value={updateForm.fullName}
                fieldName='fullName'
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                updateForm={updateForm}
                setUpdateForm={setUpdateForm}
                placeholder='Nome de Exibição'
                userData={userData}
              />
              <EditableFields
                label='cpf'
                value={updateForm.taxNumber}
                fieldName='taxNumber'
                fieldTitle='CPF:'
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                updateForm={updateForm}
                setUpdateForm={setUpdateForm}
                placeholder='000.000.000-00'
                userData={userData}
              />
              <div className='profile-input profile-image-input'>
                <div
                  className='profile-image-placeholder'
                  onClick={handleDivClick}
                  style={{
                    backgroundImage: `url(${
                      userData.Data.profilePictureMimeType &&
                      userData.Data.profilePicture
                        ? `data:${userData.Data.profilePictureMimeType};base64,${userData.Data.profilePicture}`
                        : '/Assets/imgs/cards/choose-picture.png'
                    })`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}>
                  <input
                    type='file'
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <EditableInstagramUrl
                value={updateForm.professionalsDetails.instagramUrl}
                fieldName='instagramUrl'
                fieldTitle='Instagram'
                isEditing={isEditing}
                setIsEditing={setIsEditing}
                updateForm={updateForm}
                setUpdateForm={setUpdateForm}
                placeholder='@Seu_Instagram'
                userData={userData}
              />
              <SelectableField
                  label="experienceTime"
                  value={updateForm.professionalsDetails.experienceTime}
                  fieldName="experienceTime"
                  fieldTitle='Tempo de Experiência'
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
              />
            </div>
            <div className='left-profile-block-buttons'>
              <button
                className='btn profile-buttons green-profile-button'
                type='button'>
                Destaque seu perfil
              </button>
            </div>
          </section>
          <div className='right-profile-block'>
            <div className='complement-info-container'>
              <div className='contact-info'>
                <div className='profile-block-title'>
                  <h1>Contato</h1>
                </div>
                <EditableFields
                  label='phoneNumber'
                  value={updateForm.phoneNumber}
                  fieldName='phoneNumber'
                  fieldTitle='Celular:'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
                  placeholder='(00) 0000-0000'
                  userData={userData}
                />
                <EditableFields
                  label='whatsappContact'
                  value={updateForm.whatsappContact}
                  fieldName='whatsappContact'
                  fieldTitle='WhatsApp:'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
                  placeholder='(00) 0000-0000'
                  userData={userData}
                />
                <EditableFields
                  label='email'
                  value={updateForm.email}
                  fieldName='email'
                  fieldTitle='Email:'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
                  placeholder='nome@gmail.com'
                  userData={userData}
                />
              </div>
              <div className='spliter'></div>
              <div className='address-info'>
                <div className='profile-block-title'>
                  <h1>Endereço de Atendimento</h1>
                </div>
                <EditableFields
                  label='cidade'
                  value={updateForm.address.city}
                  fieldName='address.city'
                  fieldTitle='Cidade:'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
                  placeholder='Adicionar cidade'
                  userData={userData}
                />
                <EditableFields
                  label='estado'
                  value={updateForm.address.state}
                  fieldName='address.state'
                  fieldTitle='Estado:'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
                  placeholder='Adicionar Estado'
                  userData={userData}
                />
                {allowedCities.includes(userData.Data.address.city) && (
                  <EditableAddress
                    fieldNameCityZone='Zona:'
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    updateForm={updateForm}
                    setUpdateForm={setUpdateForm}
                    userData={userData}
                  />
                )}
                <EditableFields
                  label='bairro'
                  value={updateForm.address.district}
                  fieldName='address.district'
                  fieldTitle='Bairro:'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
                  placeholder='Adicionar Bairro'
                  userData={userData}
                />
                <EditableFields
                  label='rua'
                  value={updateForm.address.street}
                  fieldName='address.street'
                  fieldTitle='Rua:'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
                  placeholder='Adicionar Rua'
                  userData={userData}
                />
                <EditableFields
                  label='complemento'
                  value={updateForm.address.complement}
                  fieldName='address.complement'
                  fieldTitle='Complemento:'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
                  placeholder='Adicionar Comp.'
                  userData={userData}
                />
                <EditableFields
                  label='cep'
                  value={updateForm.address.zipCode}
                  fieldName='address.zipCode'
                  fieldTitle='CEP:'
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  updateForm={updateForm}
                  setUpdateForm={setUpdateForm}
                  placeholder='Adicionar CEP'
                  userData={userData}
                />
              </div>
              {userData.Data.type == 'TATTOO' ? (
                <>
                  <div className='spliter'></div>{' '}
                  <div className='tattoo-styles'>
                    <div className='profile-block-title'>
                      <h1>Especialidades</h1>
                    </div>
                  </div>
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
                    initialSkills={userData.Data.skills}
                  />
                </>
              ) : (
                ''
              )}
            </div>
            <div className='right-profile-block-buttons'>
              <button
                className='btn profile-buttons'
                type='submit'>
                Salvar
              </button>
              <button
                className='btn profile-buttons green-profile-button'
                type='button'>
                Destaque seu perfil
              </button>
              <button className='btn profile-buttons delete-button'>
                Excluir Perfil
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
