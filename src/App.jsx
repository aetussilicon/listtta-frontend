import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Faq from './Pages/Faq'
import ProfessionalsLists from './Pages/ProfessionalsList'
import ComponentsTeste from './Pages/ComponentsTeste'
import Blog from './Pages/Blog'

function App() {

  return (
    <Routes>
      <Route Component={Home} exact path='/' />
      <Route Component={Faq} path='/faq' />
      <Route Component={ProfessionalsLists} path='/search' />
      <Route Component={Blog} path='blog' />
      <Route Component={ComponentsTeste} path='/testeComponents' />
    </Routes>
  )
}

export default App
