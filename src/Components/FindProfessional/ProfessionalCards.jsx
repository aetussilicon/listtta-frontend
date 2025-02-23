import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../../Styles/Components/FindProfessionals/ProfessionalCards.css';
import { ProfessionalsContext } from '../../Contexts/ProfessionalsContext';

export default function ProfessionalCards() {
    const { filteredData } = useContext(ProfessionalsContext); // Dados filtrados (todos os resultados)
    const { page = 1 } = useParams(); // Obtém a página atual da URL
    const itemsPerPage = 16;
    const currentPage = parseInt(page, 10);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className='professional-card-container'>
            {paginatedData.map((professional) => {
                const profilePicture = professional.profilePicture
                    ? `data:image/${professional.mimetype};base64,${professional.profilePicture}`
                    : 'Assets/imgs/cards/profile-picture-placeholder.png';

                return (
                    <div key={professional.puid} className='professionals-card'>
                        <div
                            className='professional-picture'
                            style={{ backgroundImage: `url(${profilePicture})` }}
                        ></div>
                        <div className='professional-info'>
                            <h3>{professional.fullName}</h3>
                            <div className='professional-locale'>
                                <img src='Assets/icons/miscellaneous/location.png' alt='' />
                                <p>
                                    {professional.address.city}/{professional.address.state}
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
            {filteredData.length === 0 && <p>Nenhum profissional encontrado.</p>}
        </div>
    );
}
