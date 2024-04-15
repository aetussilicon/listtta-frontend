import { useEffect, useState } from "react";
import '../../Styles/Components/FindProfessionals/Filters.css';

export default function Filters() {

    const [filters, setFilter] = useState([]);
    const url = "https://listtta-backend.lryftz.easypanel.host/filters/list/all";

    useEffect(() => {
        async function fetchFilters() {
            try {
                const resposne = await fetch(url, {
                    headers: {
                        'Content-Type': 'application.json',
                        // Authorization: 'Bearer ' + localStorage.getItem('user_token')
                    }
                });

                const data = await resposne.json();
                console.log(data);
                setFilter(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFilters();
    }, [])


    return (
        <div className="filters-container">
        <div className="filters-section  professional-type-select">
            <button className="btn filters-btn">Tudo</button>
            <button className="btn filters-btn">Tatuador</button>
            <button className="btn filters-btn">Body piercer</button>
        </div>
        <div className="filters-section categories-filters">
            <div className="filters location-filter">
                <div className="filters-span">
                    <span>Localização</span>
                </div>
                <form>
                    <ul className="filters-ul">
                        <li>
                            <input className="checkbox-round" type="checkbox" id="sao-paulo" name="location" value="sao-paulo" />
                            <label htmlFor="sao-paulo">São Paulo</label>
                        </li>
                        <li>
                            <input className="checkbox-round" type="checkbox" id="rio-de-janeiro" name="location" value="rio-de-janeiro" />
                            <label htmlFor="rio-de-janeiro">Rio de Janeiro</label>
                        </li>
                        <li>
                            <input className="checkbox-round" type="checkbox" id="curitiba" name="location" value="curitiba" />
                            <label htmlFor="curitiba">Curitiba</label>
                        </li>
                        <li>
                            <input className="checkbox-round" type="checkbox" id="brasilia" name="location" value="brasilia" />
                            <label htmlFor="brasilia">Brasília</label>
                        </li>
                    </ul>
                </form>
            </div>
            <div className="filters gen-filter">
                <div className="filters-span">
                    <span className="filters-span">Gênero</span>
                </div>
                <form>
                    <ul className="filters-ul">
                        <li>
                            <input className="checkbox-round" type="checkbox" id="tatuador" name="gender" />
                            <label htmlFor="tatuador">Ambos</label>
                        </li>
                        <li>
                            <input className="checkbox-round" type="checkbox" id="tatuador" name="gender" />
                            <label htmlFor="tatuador">Tatuador</label>
                        </li>
                        <li>
                            <input className="checkbox-round" type="checkbox" id="tatuadora" name="gender" />
                            <label htmlFor="tatuadora">Tatuadora</label>
                        </li>
                    </ul>
                </form>
            </div>
            <div className="filters theme-filter">
                <div className="filters-span">
                    <span>Tipos de tattoo</span>
                </div>
                <form>
                    <ul className="filters-ul">
                        {filters.length > 0 ? (
                            filters.map((filters) => (
                                <div key={filters.filterId} className="filters-div">
                                    <li className="filters-name">
                                        <input className="checkbox-round" type="checkbox" id={filters.filterName} name="filters-input" />
                                        <label htmlFor={filters.filterName}>{filters.displayName}</label>
                                    </li>
                                </div>
                            ))
                        ) : (
                            <span className="filters-span">Nenhum filtro encontrado</span>
                        )}
                    </ul>
                </form>
            </div>
        </div>
    </div>
        // <div className="result-filter-container">
        //     <div className="filters-section professional-type-select">
        //         <button className="btn">Tudo</button>
        //         <button className="btn">Tatuador</button>
        //         <button className="btn">Body Piercer</button>
        //     </div>
        //     <div className="filters-section location-filters">
        //         <span>Localização</span>
        //         <button className="btn">Selecionar Estado</button>
        //         <button className="btn">Selecionar Cidade</button>
        //     </div>
        //     <div className="filters-container">
        //         <div className="filters gen-filter">
        //             <span>Gênero</span>
        //             <form>
        //                 <ul>
        //                     <li>
        //                         <input type="checkbox" id="tatuador" name="gender" />
        //                         <label htmlFor="tatuador">Tatuador</label>
        //                     </li>
        //                     <li>
        //                         <input type="checkbox" id="tatuadoea" name="gender" />
        //                         <label htmlFor="tatuadora">Tatuadora</label>
        //                     </li>
        //                     <li>
        //                         <input type="checkbox" id="ambos" name="gender" value="ambos" />
        //                         <label htmlFor="ambos">Ambos</label>
        //                     </li>
        //                 </ul>
        //             </form>
        //         </div>
        //         <div className="filters theme-filter">
        //             <div className="filters-span">
        //                 <span>Tipos de tattoo</span>
        //             </div>
        //             <form>
        //                 <ul className="filters-ul">
        //                     {filters.length > 0 ? (
        //                         filters.map((filters) => (
        //                             <div key={filters.filterId} className="filters-div">
        //                                 <li className="filters-name">
        //                                     <input className="checkbox-round" type="checkbox" id={filters.filterName} name="filters-input" />
        //                                     <label htmlFor={filters.filterName}>{filters.displayName}</label>
        //                                 </li>
        //                             </div>
        //                         ))
        //                     ) : (
        //                         <span className="filters-span">Nenhum filtro encontrado</span>
        //                     )}
        //                 </ul>
        //             </form>
        //         </div>
        //     </div>
        // </div>
    );

}