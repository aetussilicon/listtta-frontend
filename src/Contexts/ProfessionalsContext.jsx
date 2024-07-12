import { createContext, useEffect, useState } from 'react';
import Api from '../Api';

export const ProfessionalsContext = createContext();

export const ProfessionalsProvider = ({ children }) => {
  const [professionalsAPI, setProfessionalsAPI] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [resultsCount, setResultsCount] = useState(0);

  useEffect(() => {
    getProfessionals();
  }, []);

  const getProfessionals = async () => {
    try {
      const response = await Api.get('/professionals/list/all');
      const data = await response.data.Data;

      setResultsCount(data.length > 500 ? 'mais de 500' : data.length);
      setProfessionalsAPI(data);
      setFilteredData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ProfessionalsContext.Provider
      value={{ professionalsAPI, resultsCount, filteredData, setFilteredData }}>
      {children}
    </ProfessionalsContext.Provider>
  );
};
