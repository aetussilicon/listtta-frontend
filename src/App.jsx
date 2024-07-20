import { Route, Routes } from 'react-router-dom';
import './App.css';
import Profile from './Pages/Profile.jsx';

import ProfessionalsListWIthContext from './ContextPages/ProfessionalsListWIthContext.jsx';
import HomeWithContext from './ContextPages/HomeWithContext.jsx';
import ListttaTermsContext from './ContextPages/ListttaTermsContext.jsx';
import { SignupFormProvider } from './Contexts/SignupLoginFormContext.jsx';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import { FiltersProvider } from './Contexts/FiltersConxtext.jsx';
import { StatesProvider } from './Contexts/StatesContext.jsx';
import { CitiesProvider } from './Contexts/CitiesContext.jsx';
import OauthSuccess from './Pages/OauthSuccess.jsx';

function App() {
  return (
    <AuthProvider>
      <SignupFormProvider>
        <FiltersProvider>
          <StatesProvider>
            <CitiesProvider>
              <Routes>
                <Route
                  Component={HomeWithContext}
                  exact
                  path='/'
                />
                <Route
                  Component={Profile}
                  exact
                  path='/profile'
                />
                <Route
                  Component={ListttaTermsContext}
                  path='termos-condicoes'
                />
                <Route
                  Component={Profile}
                  path='/profile/:puid'
                />
                <Route
                  Component={ProfessionalsListWIthContext}
                  path='/search'
                />
                <Route
                  Component={OauthSuccess}
                  path='/oauth/success'
                />
              </Routes>
            </CitiesProvider>
          </StatesProvider>
        </FiltersProvider>
      </SignupFormProvider>
    </AuthProvider>
  );
}

export default App;
