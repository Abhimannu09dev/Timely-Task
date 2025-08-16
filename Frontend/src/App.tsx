
import { Route, Routes } from 'react-router-dom'
import './App.css'
import SignIn from './pages/SignIn'
import Signup from './pages/Signup'
import HomePage from './pages/HomePage'
import { Bounce, ToastContainer} from 'react-toastify';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignIn />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/homepage' element={<HomePage />}></Route>
      </Routes>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
    </>
  )
}

export default App
