import { createContext, useEffect, useState } from 'react';
import Api from '../Api';
import { v4 as uuidv4 } from 'uuid';

export const ProfessionalsContext = createContext();

export const ProfessionalsProvider = ({ children }) => {
  const [professionalsAPI, setProfessionalsAPI] = useState([]); // Todos os profissionais
  const [filteredData, setFilteredData] = useState([]); // Dados filtrados
  const [resultsCount, setResultsCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [seed] = useState(uuidv4()); // Gera um seed único

  useEffect(() => {
    getAllProfessionals();
  }, [seed]);

  const getAllProfessionals = async () => {
    try {
      // Busca a primeira página para saber quantas páginas existem
      const response = await Api.get(`/professionals/list/all`, {
        params: { seed, page: 0 },
        headers: { 'X-Seed': seed },
      });

      const dataPage0 = response.data.Data.content;
      const backendTotalPages = response.data.Data.totalPages;

      // Inicializa os dados combinados com os itens da página 0
      let allData = [...dataPage0];

      // Se houver mais de uma página, busca as demais em paralelo
      if (backendTotalPages > 1) {
        const promises = [];
        for (let p = 1; p < backendTotalPages; p++) {
          promises.push(
              Api.get(`/professionals/list/all`, {
                params: { seed, page: p },
                headers: { 'X-Seed': seed },
              })
          );
        }
        const responses = await Promise.all(promises);
        responses.forEach(res => {
          const data = res.data.Data.content;
          allData = allData.concat(data);
        });
      }

      setProfessionalsAPI(allData);
      setFilteredData(allData);
    } catch (error) {
      console.error(error);
    }
  };

  // Sempre que os dados filtrados mudarem, atualiza a contagem e o total de páginas
  useEffect(() => {
    setResultsCount(filteredData.length);
    setTotalPages(Math.ceil(filteredData.length / 16));
  }, [filteredData]);

  return (
      <ProfessionalsContext.Provider
          value={{ professionalsAPI, filteredData, setFilteredData, resultsCount, totalPages, seed }}
      >
        {children}
      </ProfessionalsContext.Provider>
  );
};
