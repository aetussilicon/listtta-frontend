import { useEffect, useState } from "react";
import Header from "../Components/Header/Header";
import Filters from "../Components/FindProfessional/Filters";
import ProfessionalCards from "../Components/FindProfessional/ProfessionalCards";
import '../Styles/Pages/ProfessionalsLists.css'

export default function ProfessionalsLists() {

    return (
        <>
            <Header />
            <div className="search-banner">
                <div className="container search-container">
                    <h1>Resultados da sua Busca</h1>
                    <span>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit</span>
                </div>
            </div>
            <div className="results-area">
                <Filters />
                <div className="cards-results container results-container">
                    <div className="card-results-top-bar">
                        <p>Total de resultados: </p>
                        <button className="filter-order-by btn">Ordernar por</button>
                    </div>
                    <ProfessionalCards />
                </div>
            </div>
        </>
    );
}