import Header from "../Components/Header/Header";
import ProfessionalCards from "../Components/FindProfessional/ProfessionalCards";
import "../Styles/Pages/ProfessionalsLists.css";
import Footer from "../Components/Footer/Footer";
import MainSearchFilter from "../Components/Filters/MainSearchFilter";

export default function ProfessionalsLists() {
  return (
    <>
      <Header />
      <div className="search-banner">
        <div className="container search-container">
          <h1>Resultados da sua Busca</h1>
          <span>
            Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit
          </span>
        </div>
      </div>
      <div className="results-block">
        <div className="results-area-container">
          <MainSearchFilter />
        </div>
        <div className="professionals-results-area">
          <div className="cards-results container results-container">
            <p>Total de resultados: </p>
            <button
              className="btn filters-btn top-bar-professionals-button"
            //   onClick={() => setFilterMenu(true)}
            >
              Filtros Avançados
            </button>
          </div>
          <ProfessionalCards />
        </div>
      </div>
      <Footer />
    </>
  );
}
