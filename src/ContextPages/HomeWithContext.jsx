import { CitiesProvider } from "../Contexts/CitiesContext";
import { StatesProvider } from "../Contexts/StatesContext";
import Home from "../Pages/Home";

export default function HomeWithContext() {
  return (
    <StatesProvider>
      <CitiesProvider>
        <Home />
      </CitiesProvider>
    </StatesProvider>
  );
}
