import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";
import '../Styles/Pages/Home.css';

export default function Home() {
    return (
        <>
            <div className="first-banner-block">
                <Header />
                <div className="first-block-content container">
                    <div className="slogan">
                        <h1>Venha fazer parte desta revolução na <span>tatuagem</span> e <span>piercing</span></h1>
                    </div>
                    <div className="first-card-block">
                        <div className="home-first-card-content">
                            <h1>Cadastre-se tatuador e piercing</h1>
                            <span>Você não paga nada para se cadastrar</span>
                            <button className="btn">Quero cadastrar agora mesmo</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container home-container">
                <div className="sponsers">
                    <div>Nossos parceiros</div>
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                </div>
                <div className="about-listtta-block">
                    <div className="about-listtta">
                        <span>Como funciona?</span>
                        <h1>É tudo grátis! Sem taxas, comissões ou agendamentos. Fale diretamente com o artista</h1>
                        <p>
                            O cliente entra no site e coloca a cidade ou usa sua localização, escolhe o tatuador ou piercer.
                            Se for tatuador, escolhe o tema ou técnica da tatuagem (por exemplo floral, black work, aquarela etc)
                            e aí aparece a lista de tatuadores com foto, nome e seu perfil no instagram.
                        </p>
                        <button>Saiba mais <span className="material-symbols-outlined">east</span></button>
                    </div>
                    <div><img src="Assets/imgs/miscellaneous/woman.png" /></div>
                </div>
                <div className="second-card-block">
                    <div className="second-card-block-info">
                        <h1>Você também ganha clientes e também descontos</h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                        <button>Cadastre-se  <span className="material-symbols-outlined">east</span></button>
                    </div>
                </div>
                <div className="solo-text">
                    <h1>Você tatuador não paga nada para fazer parte da LISTTTA. Você cliente não paga nada para buscar seu artista.</h1>
                </div>
                <div className="home-search-block">
                    <div className="search-block-text">
                        <h3>Buscador</h3>
                        <h1>Encontre o seu tatuador ou piercer</h1>
                    </div>
                    <div className="search-form">
                        <form>
                            <input type="text"></input>
                            <input type="text"></input>
                            <button>Buscar profissional</button>
                        </form>
                    </div>
                    <div className="blog-section">
                        <div className="blog-section-top-bar">
                            <div className="section-title">
                                <span>Blog</span>
                                <h1>Últimas notícias</h1>
                            </div>
                            <div className="breaker" />
                            <div className="section-text-button">
                                <span>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece</span>
                                <a href="/blog">Veja todos os artigos</a>
                            </div>
                        </div>
                        <div className="latest-blog-posts">

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}