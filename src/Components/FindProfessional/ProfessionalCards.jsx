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
    <div className="professional-card-container">
      {filteredProfessionals.map((professional) => (
        <div key={professional.puid} className="professionals-card">
          <div className="professional-picture">
            {/* Imagem não utilizada */}
          </div>
          <div className="professional-info">
            <h3>{professional.fullName}</h3>
            <div className="professional-locale">
              <img src="Assets/icons/miscellaneous/location.png" alt="" />
              <p>{professional.city}/{professional.state}</p>
            </div>
            <button className="btn">
              <img src="Assets/icons/social-networks/mono-instagram.svg" alt="" />
              @{professional.instagramUrl}
            </button>
          </div>
        </div>
      ))}
      {/* Adicione uma mensagem para indicar que não há resultados */}
      {filteredProfessionals.length === 0 && <p>Nenhum profissional encontrado.</p>}
    </div>
  );
}
