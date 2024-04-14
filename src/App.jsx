import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'
import Login from './Components/Signup/Login'
import TesteComponente from './Pages/TesteComponents'
import SignupPiercer from './Pages/SignupPiercer'
import SignupTattoo from './Pages/SignupTattoo'
import SignupUser from './Pages/SignupUser'
import ProfessionalsLists from './Pages/ProfessionalsList'

function App() {

  return (
    <Routes>
      <Route Component={Home} exact path='/' />
      <Route Component={TesteComponente} path='testing' />
      <Route Component={SignupPiercer} path='/signup/piercer' />
      <Route Component={SignupTattoo} path='/signup/tattoo' />
      <Route Component={SignupUser} path='/signup/user' />
      <Route Component={ProfessionalsLists} path='/search' />
    </Routes>
  )
}

export default App
