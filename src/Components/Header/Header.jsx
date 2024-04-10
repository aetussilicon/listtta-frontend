import "../../Styles/Components/Header/Header.css"

export default function Header() {

    function menuClick() {
        const menu = document.getElementById('menu-to-display');
        if (menu.style.display == 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }

    return (
        <header>
            <nav>
                <div className="container header-container">
                    <div className="header-right-side">
                        <div className="header-top-line">
                            <a><img src="Assets/icons/logo/colorful-logo.png" alt="Listtta-logo" /></a>
                            <span onClick={menuClick} className="material-symbols-outlined">menu</span>
                        </div>
                        <div id="menu-to-display" className="nav-links">
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li>
                                    <a href="/about-us">Sobre o Listtta</a>
                                </li>
                                <li>
                                    <a href="search">Profissionais</a>
                                </li>
                                <li>
                                    <a href="/how-it-works">Como funciona?</a>
                                </li>
                                <li>
                                    <a href="contact">Contato</a>
                                </li>
                            </ul>
                            <div id="menu-to-display" className="nav-register menu-buttons hidden-inverse">
                                <button className="button">login</button>
                                <a>Cadastre-se</a>
                            </div>
                        </div>
                        <div className="nav-register hidden">
                            <button><a>Login</a></button>
                            <a>Cadastre-se</a>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}