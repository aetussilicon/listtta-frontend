import { CitiesProvider } from "../Contexts/CitiesContext";
import { FiltersProvider } from "../Contexts/FiltersConxtext";
import { SignupFormProvider } from "../Contexts/SignupLoginFormContext";
import { StatesProvider } from "../Contexts/StatesContext";
import ListttaTerms from "../Pages/ListttaTerms";

export default function ListttaTermsContext() {
    return (
        <SignupFormProvider>
            <FiltersProvider>
                <StatesProvider>
                    <CitiesProvider>
                        <ListttaTerms />
                    </CitiesProvider>
                </StatesProvider>
            </FiltersProvider>
        </SignupFormProvider>
    );
}