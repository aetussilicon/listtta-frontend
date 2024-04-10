import FaqItem from "../Components/Faq/FaqItem";
import '../Styles/Pages/Faq.css'
import SearchBar from "../Components/Faq/SearchBar";
import Footer from "../Components/Footer/Footer";
import Header from "../Components/Header/Header";

export default function () {
    return (
        <>
            <Header />
            <div className="faq-section">
                <div className="container faq-container">
                    <div className="search-section">
                        <h1>Olá, como podemos ajudar?</h1>
                        <SearchBar />
                    </div>
                </div>
            </div>
            <div className="faq-itens-container container">
                <h2>Pesquisar por tópicos de ajuda</h2>
                    <FaqItem
                        question="Ao me cadastrar no site e usar o buscador tenho que pagar algo?"
                        answer="Não, você não precisa pagar nada, a LISTTTA não cobra taxa de agendamento, comissão ou sinal, é totalmente gratuito. " />
                    <FaqItem
                        question="Vocês são responsáveis pela tatuagem feita? "
                        answer=" Não, a LISTTTA é uma ferramenta de busca de tatuadores e piercers cadastrados, não nos responsabilizamos pelos serviços prestados por eles. A responsabilidade é exclusivamente do tatuador ou piercer. 
                        Informamos o nome, número de WhatsApp e o perfil do artista no Instagram cabendo ao consumidor a escolha do artista e da negociação que é direta." />
                    <FaqItem
                        question="Caso o tatuador ou piercer peça algum pagamento antecipado, devo fazer?"
                        answer="     É comum o pagamento de um sinal mas recomendamos que faça conferindo os dados do tatuador e da sua conta bancária. Um sinal deve ficar entre 10 a 20% do valor total. Lembrando que a LISTTTA não cobra nada por tatuagem feita ou agendamento nem do tatuador nem do cliente." />
                    <FaqItem
                        question="Como os meus dados serão armazenados ou utilizados? "
                        answer=" Os dados dos clientes serão tratados dentro da LGPD - Lei Geral de Proteção de Dados e não poderão ser utilizados fora do que foi aceito pelo cliente ao concordar com o Termo de Uso." />
                </div>
            <Footer />
        </>
    );
}