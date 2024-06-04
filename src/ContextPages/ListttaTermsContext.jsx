import { CitiesProvider } from "../Contexts/CitiesContext";
import { StatesProvider } from "../Contexts/StatesContext";
import ListttaTerms from "../Pages/ListttaTerms";

export default function ListttaTermsContext() {
  return (
    <StatesProvider>
      <CitiesProvider>
        <ListttaTerms />
      </CitiesProvider>
    </StatesProvider>
  );
}
