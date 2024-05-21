import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const ProfessionalsContext = createContext();

export const ProfessionalsProvider = ({children}) => {
    const [professionalsAPI, setProfessionalsAPI] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    let professionalsUrl = 'http://localhost:8080/professionals/list/all';

    useEffect(() => {
        getProfessionals();
    }, [])

    const getProfessionals = async () => {
        try {
            const response = await axios.get(professionalsUrl);
            const data = await response.data;
            console.log(data);
            setProfessionalsAPI(data);
            setFilteredData(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ProfessionalsContext.Provider value={{professionalsAPI, filteredData, setFilteredData}}>
            {children}
        </ProfessionalsContext.Provider>
    );
}