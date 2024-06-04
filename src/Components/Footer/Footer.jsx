import { variables } from "../../Variables";
import '../../Styles/Components/Footer/Footer.css'

export default function Footer() {
    return (
        <div className="footer-section">
            <div className="top-line" />
            <div className="container footer-container">
                <div className="listtta-logo"><img src={variables.listttaLogo} alt="" /></div>
                <div className="footer-links">
                    <div className="links-block">
                        <ul>
                            <li>
                                <a href={variables.howWorksPage}>Como funciona?</a>
                            </li>
                            <li>
                                <a href="#">Cadastre-se</a>
                            </li>
                            <li>
                                <a href={variables.searchPage}>Encontrar um profissional</a>
                            </li>
                        </ul>
                    </div>
                    <div className="links-block">
                        <ul>
                            <li>
                                <a href={variables.faqPage}>Dúvidas frequentes</a>
                            </li>
                            <li>
                                <a href={variables.aboutUsPage}>Sobre o Listtta</a>
                            </li>
                            <li>
                                <a href={variables.contactUsPage}>Fale conosco</a>
                            </li>
                        </ul>
                    </div>
                    <div className="links-block">
                        <div className="social-media-title">
                            <span><strong>Siga-nos</strong></span>
                        </div>
                        <div className="social-media">
                            <div><a href="#"><img src={variables.facebookMonoLogo} alt="" /></a></div>
                            <div><a href="#"><img src={variables.instagramMonoLogo} alt="" /></a></div>
                        </div>
                    </div>
                    <div className="newsletter-block">
                        <form>
                            <label htmlFor="newsletter-email">Receba nossa newsletter</label>
                            <input type="text" name="newsletter-email" placeholder="Digite seu email"></input>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-footer">
                <div className="footer-bottom-content">
                    <div>
                        <span className="material-symbols-outlined footer-p">copyright</span>
                        <p className="footer-p">2024 Listtta</p>
                        <span className="material-symbols-outlined footer-p"> horizontal_rule </span>
                        <span className="footer-p">Termos de uso</span>
                        <span className="material-symbols-outlined circle-text footer-p">circle</span>
                    </div>
                    <div>
                        <span className="footer-p"><a href="/termos-condicoes">Política de privacidade</a></span>
                        <span className="material-symbols-outlined circle-text footer-p">circle</span>
                    </div>
                    <div>
                        <span className="footer-p"><a href="/termos-condicoes">Política de cookies</a></span>
                        <span className="material-symbols-outlined circle-text footer-p">circle</span>
                        <span className="footer-p">LGPD</span>
                    </div>
                </div>
                <div className="developer-div">
                    <span><a className="developer">Desenvolvido por Artur Oliveira</a></span>
                </div>
            </div>
        </div>
    );
}