import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import MainSearchFilter from '../Components/Filters/MainSearchFilter';
import MobileFilter from '../Components/FindProfessional/MobileFilter';
import ProfessionalCards from '../Components/FindProfessional/ProfessionalCards';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import { ProfessionalsContext } from '../Contexts/ProfessionalsContext';
import '../Styles/Pages/ProfessionalsLists.css';
import Pagination from '../Components/Pagination';

export default function ProfessionalsLists() {
  const { resultsCount, totalPages } = useContext(ProfessionalsContext);
  const { page = 1 } = useParams(); // Obtém o número da página da URL
  const [filterMenu, setFilterMenu] = useState(false);

  return (
      <>
        <Header />
        <div className='search-banner'>
          <div className='container search-container'>
            <h1>Resultados da sua Busca</h1>
            <span>
            Segue abaixo a lista dos artistas selecionados conforme a sua busca.
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
            <ProfessionalCards /> {/* Exibe os resultados da página atual */}
            <Pagination currentPage={parseInt(page, 10)} totalPages={totalPages} />
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