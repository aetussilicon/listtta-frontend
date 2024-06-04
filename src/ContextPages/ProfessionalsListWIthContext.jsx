import { StatesProvider } from "../Contexts/StatesContext";
import ProfessionalsLists from "../Pages/ProfessionalsList";
import { CitiesProvider } from "../Contexts/CitiesContext";
import { ProfessionalsProvider } from "../Contexts/ProfessionalsContext";

export default function ProfessionalsListWIthContext() {
  return (
    <ProfessionalsProvider>
      <StatesProvider>
        <CitiesProvider>
          <ProfessionalsLists />
        </CitiesProvider>
      </StatesProvider>
    </ProfessionalsProvider>
  );
}
