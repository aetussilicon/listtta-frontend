import { useContext, useState } from 'react';
import MainSearchFilter from '../Components/Filters/MainSearchFilter';
import MobileFilter from '../Components/FindProfessional/MobileFilter';
import ProfessionalCards from '../Components/FindProfessional/ProfessionalCards';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { ProfessionalsContext } from '../Contexts/ProfessionalsContext';
import '../Styles/Pages/ProfessionalsLists.css';

export default function ProfessionalsLists() {
  const { resultsCount } = useContext(ProfessionalsContext);
  const [displayCount, setDisplayCount] = useState(12);
  const [filterMenu, setFilterMenu] = useState(false);

  const loadMoreCards = () => {
    setDisplayCount(displayCount + 12);
  };

  return (
    <>
      <Header />
      <div className='search-banner'>
        <div className='container search-container'>
          <h1>Resultados da sua Busca</h1>
          <span>
            Segue abaixo a lista dos artistas selecionados conforme a sua busca,
            caso queira ver outros clique em Carregar Mais
          </span>
        </div>
      </div>
      <div className='results-block'>
        <div className='results-area-container'>
          <MainSearchFilter />
        </div>
        <div className='professionals-results-area'>
          <div className='cards-results container results-container'>
            <span className='default-span'>
              Total de resultados: {resultsCount}{' '}
            </span>
            <button
              className='white-btn top-bar-professionals-button'
              onClick={() => setFilterMenu(true)}>
              Filtros Avançados
            </button>
          </div>
          <ProfessionalCards displayCount={displayCount} />
          <div className='load-more'>
            <button
              className='btn load-more-btn'
              onClick={loadMoreCards}>
              Carregar Mais
            </button>
          </div>
        </div>
      </div>
      <Footer />
      <MobileFilter
        trigger={filterMenu}
        setTrigger={setFilterMenu}
      />
    </>
  );
}
