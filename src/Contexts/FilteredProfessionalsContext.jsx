import { createContext, useContext, useState } from "react";
import { ProfessionalsContext } from "./ProfessionalsContext";

export const FilteredProfessionalsContext = createContext();

export const FilteredProfessionalsProvider = ({children}) => {
    const {professionalsAPI} = useContext(ProfessionalsContext);
    const [filteredData, setFilteredData] = useState();
    setFilteredData(professionalsAPI)
    
    return (
        <FilteredProfessionalsContext.Provider value={{filteredData, setFilteredData}}>
            {children}
        </FilteredProfessionalsContext.Provider>
    );

}