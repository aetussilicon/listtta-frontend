import Header from "../Components/Header/Header";
import ProfessionalCards from "../Components/FindProfessional/ProfessionalCards";
import "../Styles/Pages/ProfessionalsLists.css";
import Footer from "../Components/Footer/Footer";
import MainSearchFilter from "../Components/Filters/MainSearchFilter";
import { useContext, useState } from "react";
import { ProfessionalsContext } from "../Contexts/ProfessionalsContext";
import MobileFilter from "../Components/FindProfessional/MobileFilter";

export default function ProfessionalsLists() {
  
  const {resultsCount} = useContext(ProfessionalsContext);
  const [displayCount, setDisplayCount] = useState(12);
  const [filterMenu, setFilterMenu] = useState(false);

  const loadMoreCards = () => {
    setDisplayCount(displayCount + 12);
  }
  
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
            <span className="default-span">Total de resultados: {resultsCount} </span>
            <button
              className="white-btn top-bar-professionals-button"
              onClick={() => setFilterMenu(true)}
            >
              Filtros Avançados
            </button>
          </div>
          <ProfessionalCards displayCount={displayCount}/>
          <div className="load-more">
              <button
                className="btn load-more-btn"
                onClick={loadMoreCards}
              >
                Carregar Mais
              </button>
            </div>
        </div>
      </div>
      <Footer />
      <MobileFilter trigger={filterMenu} setTrigger={setFilterMenu} />
    </>
  );
}
