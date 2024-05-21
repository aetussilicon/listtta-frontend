import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const FiltersContext = createContext();

export const FiltersProvider = ({children}) => {
    const [specialtiesAPI, setSpecialtiesAPI] = useState([]);
    const specialtiesUrl = 'http://localhost:8080/filters/list/all';

    useEffect(() => {
        getSpecialties();
    }, [])
    
    const getSpecialties = async () => {
        try {
            const response = await axios.get(specialtiesUrl);
            const data = await response.data;
            console.log(data);
            setSpecialtiesAPI(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <FiltersContext.Provider value={{specialtiesAPI}}>
            {children}
        </FiltersContext.Provider>
    )
}