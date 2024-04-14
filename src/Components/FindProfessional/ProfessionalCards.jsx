import { useEffect, useState } from 'react';
import '../../Styles/Components/FindProfessionals/ProfessionalCards.css';

export default function ProfessionalCards() {
    const [professionals, setProfessionals] = useState([]);

    useEffect(() => {
        async function fetchProfessionals() {
            try {
                const response = await fetch('https://listtta-backend.lryftz.easypanel.host/professionals/list/all');

                const data = await response.json();
                console.log(data);
                setProfessionals(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchProfessionals();
    }, [])

    return (
        <div className="professional-card-container">
            {professionals.length > 0 ? (
                professionals.map((professionals) =>
                    <div key={professionals.userTag} className="professionals-card">
                        <div className="professional-picture">
                            {/* <img src="Assets/imgs/cards/users-card-placeholder.png" alt="" /> */}
                        </div>
                        <div className="professional-info">
                            <h3>{professionals.userTag}</h3>
                            <div className="professional-locale">
                                <img src="Assets/icons/miscellaneous/location.png" alt="" />
                                <p>São Paulo/SP</p>
                            </div>
                            <button className='btn'><img src="Assets/icons/social-networks/mono-instagram.svg" alt="" />@{professionals.instagramUrl}</button>
                        </div>
                    </div>
                )

            ) : (
                <p>Sem profissionais para exibir</p>
            )}
        </div>
    );
}