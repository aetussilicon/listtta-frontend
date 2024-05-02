import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import '../Styles/Pages/Profile.css';

export default function Profile() {
    return(
        <>
            <Header />
            <div className="container profile-container">
                <div className="profile-right-block">
                    <div className="profile-info-block">
                        <span className="default-span profile-info-span profile-info-span-title">Nome de exibição</span>
                        <button className="profile-edit-button"><img src="/Assets/icons/buttons/pencil.svg" alt="" /></button>
                    </div>
                    <div className="profile-info-block">
                        <img src="/Assets/imgs/cards/choose-picture.png" alt="Escolher foto de perfil" />
                    </div>
                    <div className="profile-info-block">
                        <span className="default-span profile-info-span">Local: São Paulo / SP</span>
                        <button className="profile-edit-button"><img src="/Assets/icons/buttons/pencil.svg" alt="" /></button>
                    </div>
                    <div className="profile-info-block">
                        <span className="default-span profile-info-span">Instagram: @nomeuser</span>
                        <button className="profile-edit-button"><img src="/Assets/icons/buttons/pencil.svg" alt="" /></button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}