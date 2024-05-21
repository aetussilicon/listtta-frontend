import { createContext, useState } from "react";

export const FilteredProfessionalsContext = createContext();

export const FilteredProfessionalsProvider = ({children}) => {
    const [filteredData, setFilteredData] = useState([]);

    return (
        <FilteredProfessionalsContext.Provider value={{filteredData, setFilteredData}}>
            {children}
        </FilteredProfessionalsContext.Provider>
    );

}