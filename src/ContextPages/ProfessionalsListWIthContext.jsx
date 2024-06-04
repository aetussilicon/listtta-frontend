import { StatesProvider } from "../Contexts/StatesContext";
import ProfessionalsLists from "../Pages/ProfessionalsList";
import { CitiesProvider } from "../Contexts/CitiesContext";
import { FiltersProvider } from "../Contexts/FiltersConxtext";
import { ProfessionalsProvider } from "../Contexts/ProfessionalsContext";

export default function ProfessionalsListWIthContext() {
  return (
    <FiltersProvider>
      <ProfessionalsProvider>
        <StatesProvider>
          <CitiesProvider>
            <ProfessionalsLists />
          </CitiesProvider>
        </StatesProvider>
      </ProfessionalsProvider>
    </FiltersProvider>
  );
}
