import { createContext, useEffect, useState } from 'react';
import Api from '../Api';

export const FiltersContext = createContext();

export const FiltersProvider = ({ children }) => {
  const [specialtiesAPI, setSpecialtiesAPI] = useState([]);

  useEffect(() => {
    getSpecialties();
  }, []);

  const getSpecialties = async () => {
    try {
      const response = await Api.get('/filters/list/all');
      const data = await response.data;
      setSpecialtiesAPI(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FiltersContext.Provider value={{ specialtiesAPI }}>
      {children}
    </FiltersContext.Provider>
  );
};
