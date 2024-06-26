import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StatesContext = createContext();

export const StatesProvider = ({ children }) => {
	const [statesAPI, setStatesAPI] = useState([]);
	const statesUrl = "https://brasilapi.com.br/api/ibge/uf/v1";

	useEffect(() => {
		getStates();
	}, []);

	const getStates = async () => {
		try {
			const response = await axios.get(statesUrl);
			let data = await response.data;
			data = data.sort((a, b) => a.nome.localeCompare(b.nome));
			setStatesAPI(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<StatesContext.Provider value={{ statesAPI }}>
			{children}
		</StatesContext.Provider>
	);
};
