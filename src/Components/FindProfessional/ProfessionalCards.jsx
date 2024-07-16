import { useContext, useEffect, useState } from 'react';
import '../../Styles/Components/FindProfessionals/ProfessionalCards.css';
import { ProfessionalsContext } from '../../Contexts/ProfessionalsContext';

export default function ProfessionalCards({ displayCount }) {
  const { filteredData } = useContext(ProfessionalsContext);
  const [filteredProfessionals, setFilteredProfessionals] = useState([]);

  useEffect(() => {
    const slicedData = filteredData.slice(0, displayCount);
    setFilteredProfessionals(slicedData);
  }, [filteredData, displayCount]);

  return (
    <div className='professional-card-container'>
      {filteredProfessionals.map((professional) => {
        // Verifica se profilePicture é base64, se não, usa placeholderImage
        const profilePicture = professional.profilePicture
          ? `data:image/${professional.mimetype};base64,${professional.profilePicture}`
          : 'Assets/imgs/cards/profile-picture-placeholder.png';
        // console.log('Profile Picture:', profilePicture);

        return (
          <div
            key={professional.puid}
            className='professionals-card'>
            <div
              className='professional-picture'
              style={{
                backgroundImage: `url(${profilePicture})`,
              }}></div>
            <div className='professional-info'>
              <h3>{professional.fullName}</h3>
              <div className='professional-locale'>
                <img
                  src='Assets/icons/miscellaneous/location.png'
                  alt=''
                />
                <p>
                  {professional.address.city}/{professional.address.state}{' '}
                  <br />
                  {professional.address.cityZone !== null &&
                    `Zona: ${professional.address.cityZone}`}
                </p>
              </div>
              <button className='btn'>
                <img
                  src='Assets/icons/social-networks/mono-instagram.svg'
                  alt=''
                />
                @{professional.details.instagramUrl}
              </button>
            </div>
          </div>
        );
      })}
      {filteredProfessionals.length === 0 && (
        <p>Nenhum profissional encontrado.</p>
      )}
    </div>
  );
}
