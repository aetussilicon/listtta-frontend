import Header from "../Components/Header/Header.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import '../Styles/Pages/Profile.css';

export default function Profile() {
    return(
        <>
            <Header />
            <div className="container profile-container">
                <div className="profile-right-block">
                    <div className="profile-right-block-info">
                        <div className="profile-info-block">
                            <span className="default-span profile-info-span profile-info-span-title">Nome de exibição</span>
                            <button className="profile-edit-button"><img src="/Assets/icons/buttons/pencil.svg" alt=""/>
                            </button>
                        </div>
                        <div className="profile-info-block">
                            <img src="/Assets/imgs/cards/choose-picture.png" alt="Escolher foto de perfil"/>
                        </div>
                        <div className="profile-info-block">
                            <span className="default-span profile-info-span">Local:</span>
                            <span className="default-span profile-info-span-content">São Paulo /</span>
                            <span className="default-span profile-info-span-content">SP</span>
                            <button className="profile-edit-button"><img src="/Assets/icons/buttons/pencil.svg" alt=""/>
                            </button>
                        </div>
                        <div className="profile-info-block">
                            <span className="default-span profile-info-span">Instagram:</span>
                            <span className="default-span profile-info-span-content">@nomeuser</span>
                            <button className="profile-edit-button"><img src="/Assets/icons/buttons/pencil.svg" alt=""/>
                            </button>
                        </div>
                    </div>
                    <div>
                        <button className="btn green-btn profile-button hidden">Destaque seu perfil</button>
                    </div>
                </div>
                <div className="profile-left-block">
                    <div className="profile-left-block-info">
                        <div className="profile-info-block center-text">
                            <span className="default-span profile-info-span profile-info-span-title">Contato</span>
                        </div>
                        <div className="profile-info-block">
                            <span className="default-span profile-info-span">Celular:</span>
                            <span className="default-span profile-info-span-content">11 0000-0000</span>
                            <button className="profile-edit-button"><img src="/Assets/icons/buttons/pencil.svg" alt=""/>
                            </button>
                        </div>
                        <div className="profile-info-block">
                            <span className="default-span profile-info-span">Whatsapp:</span>
                            <span className="default-span profile-info-span-content">11 0000-0000</span>
                            <button className="profile-edit-button"><img src="/Assets/icons/buttons/pencil.svg" alt=""/>
                            </button>
                        </div>
                        <div className="profile-info-block">
                            <span className="default-span profile-info-span">E-mail:</span>
                            <span className="default-span profile-info-span-content">nome@gmail.com</span>
                            <button className="profile-edit-button"><img src="/Assets/icons/buttons/pencil.svg" alt=""/>
                            </button>
                        </div>
                    </div>
                    <div className="profile-right-block-buttons">
                        <button className="btn green-btn profile-button button-inverse-hidden">Destaque seu perfil</button>
                        <button className="btn profile-button">Salvar</button>
                        <button className="btn profile-button delete-profile-button">Excluir perfil</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    );
}