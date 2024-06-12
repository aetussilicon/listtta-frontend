import { Route, Routes } from "react-router-dom";
import "./App.css";
import Profile from "./Pages/Profile.jsx";

import ProfessionalsListWIthContext from "./ContextPages/ProfessionalsListWIthContext.jsx";
import HomeWithContext from "./ContextPages/HomeWithContext.jsx";
import ListttaTermsContext from "./ContextPages/ListttaTermsContext.jsx";
import { SignupFormProvider } from "./Contexts/SignupLoginFormContext.jsx";
import { AuthProvider } from "./Contexts/AuthContext.jsx";
import { FiltersProvider } from "./Contexts/FiltersConxtext.jsx";

function App() {
  return (
    <AuthProvider>
      <SignupFormProvider>
        <FiltersProvider>
          <Routes>
            <Route Component={HomeWithContext} exact path="/" />
            <Route Component={Profile} exact path="/profile" />
            <Route Component={ListttaTermsContext} path="termos-condicoes" />
            <Route Component={Profile} path="/profile/:puid" />
            <Route Component={ProfessionalsListWIthContext} path="/search" />
          </Routes>
        </FiltersProvider>
      </SignupFormProvider>
    </AuthProvider>
  );
}

export default App;
