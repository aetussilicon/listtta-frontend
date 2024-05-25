import { CitiesProvider } from "../Contexts/CitiesContext";
import { FiltersProvider } from "../Contexts/FiltersConxtext";
import { SignupFormProvider } from "../Contexts/SignupLoginFormContext";
import { StatesProvider } from "../Contexts/StatesContext";
import Home from "../Pages/Home";

export default function HomeWithContext() {
    return (
        <SignupFormProvider>
            <FiltersProvider>
                <StatesProvider>
                    <CitiesProvider>
                       <Home /> 
                    </CitiesProvider>
                </StatesProvider>
            </FiltersProvider>
        </SignupFormProvider>
    );
}