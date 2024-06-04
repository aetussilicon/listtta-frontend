import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPrototype from "./Pages/LoginPrototype";
import Profile from "./Pages/Profile.jsx";

import ProfessionalsListWIthContext from "./ContextPages/ProfessionalsListWIthContext.jsx";
import HomeWithContext from "./ContextPages/HomeWithContext.jsx";
import ListttaTermsContext from "./ContextPages/ListttaTermsContext.jsx";

function App() {
  return (
    <Routes>
      <Route Component={HomeWithContext} exact path="/" />
      <Route Component={Profile} exact path="/profile" />
      <Route Component={ListttaTermsContext} path="termos-condicoes" />
      <Route Component={LoginPrototype} path="/login" />
      <Route Component={ProfessionalsListWIthContext} path="/search" />
    </Routes>
  );
}

export default App;
