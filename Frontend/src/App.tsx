
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/homepage' element={<HomePage />}></Route>
      </Routes>
    </>
  )
}

export default App
