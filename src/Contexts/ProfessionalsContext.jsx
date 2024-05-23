import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProfessionalsContext = createContext();

export const ProfessionalsProvider = ({children}) => {
    const [professionalsAPI, setProfessionalsAPI] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [resultsCount, setResultsCount] = useState(0);

    let professionalsUrl = 'http://192.168.15.6:8080/professionals/list/all';

    useEffect(() => {
        getProfessionals();
    }, [])

    const getProfessionals = async () => {
        try {
            const response = await axios.get(professionalsUrl);
            const data = await response.data;
            
            setResultsCount(data.length > 500 ? "mais de 500" : data.length);
            setProfessionalsAPI(data);
            setFilteredData(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ProfessionalsContext.Provider value={{professionalsAPI, resultsCount,  filteredData, setFilteredData}}>
            {children}
        </ProfessionalsContext.Provider>
    );
}