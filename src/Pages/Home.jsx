import HomePostCard from "../Components/Blog/PostCards/HomePostCard";
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
            <div className="sponsers-div">
                <div className="sponsers-container container">
                    <span>Nossos parceiros:</span>
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                    <img src="Assets/icons/logo/mono-logo.png" alt="Listtta-mono-logo" />
                </div>
            </div>
            <div className="container about-container">
                <div className="about-listtta-block">
                    <div className="about-listtta">
                        <div className="about-text">
                            <span>Como funciona?</span>
                            <h1>É tudo grátis! Sem taxas, comissões ou agendamentos. Fale diretamente com o artista</h1>
                            <p>
                                O cliente entra no site e coloca a cidade ou usa sua localização, escolhe o tatuador ou piercer.
                                Se for tatuador, escolhe o tema ou técnica da tatuagem (por exemplo floral, black work, aquarela etc)
                                e aí aparece a lista de tatuadores com foto, nome e seu perfil no instagram.
                            </p>
                        </div>
                        <div className="center-button">
                            <button className="btn">Saiba mais <span className="material-symbols-outlined">east</span></button>
                        </div>

                    </div>
                    <div className="woman-img"><img src="Assets/imgs/miscellaneous/woman.png" /></div>
                </div>
            </div>
            <div className="second-card container responsive-container">
                <div className="second-card-block">
                    <div className="second-card-block-info">
                        <h1 className="second-card-text">Você também ganha clientes e também descontos</h1>
                        <p className="second-card-text">Lorem ipsum dolor sit amet, consectetur. </p>
                        <div className="center-button">
                            <button className="btn">Cadastre-se  <span className="material-symbols-outlined">east</span></button>
                        </div>
                    </div>
                </div>
                <div className="solo-text">
                    <h1>Você tatuador não paga nada para fazer parte da LISTTTA. Você cliente não paga nada para buscar seu artista.</h1>
                </div>
            </div>
            <div className="home-search-block">
                <div className="container home-search-container">
                    <div className="search-block-text">
                        <h2>Buscador</h2>
                        <h1>Encontre o seu tatuador ou piercer</h1>
                    </div>
                    <div className="search-form">
                        <form>
                            <input className="default-input location-input" type="text" placeholder="Cidade, estado, cep..."></input>
                            <input className="default-input professional-type-input" type="text" placeholder="Tatuador ou piercer"></input>
                            <button className="btn search-button">Buscar profissional</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="blog-section">
                <div className="container home-blog-container">
                    <div className="blog-section-top-bar">
                        <div className="section-title">
                            <span>Blog</span>
                            <h1>Últimas notícias</h1>
                        </div>
                        <div className="breaker" />
                        <div className="section-text-button">
                            <span>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece</span>
                            <a className="btn" href="/blog">Veja todos os artigos</a>
                        </div>
                    </div>
                    <div className="latest-blog-posts">
                        <HomePostCard />
                        <HomePostCard />
                        <HomePostCard />
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
}