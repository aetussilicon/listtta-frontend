import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home'

function App() {

  return (
    <Routes>
      <Route Component={Home} exact path='/' />
    </Routes>
  )
}

export default App
