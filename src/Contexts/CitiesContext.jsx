import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CitiesContext = createContext();

export const CitiesProvider = ({children}) => {
    const [stateName, setStateName] = useState('');
    const [citiesAPI, setCitiesAPI] = useState([]);

    const cityUrl = 'https://brasilapi.com.br/api/ibge/municipios/v1/';

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    const getCities = async () => {
        try {
            if(stateName.trim() !== ''){
                const response = await axios.get(cityUrl + stateName + '?providers=dados-abertos-br,gov,wikipedia');
                let data = await response.data;
                data = data.map(city => ({
                    ...city,
                    nome: capitalize(city.nome)
                }));
                data = data.sort((a, b) => a.nome.localeCompare(b.nome)); 
                setCitiesAPI(data);
            }
        } catch(error) {
            console.error(error); 
        }
    }

    useEffect(() => {
        getCities();
    }, [stateName])

    return (
        <CitiesContext.Provider value={{stateName, setStateName, citiesAPI}}>
            {children}
        </CitiesContext.Provider>
    );
}