import './App.css'
import Navbar from './components/Navbar'
import { Outlet, Route, Routes } from 'react-router-dom'
import Homepage from './components/pages/Homepage'
import ShoppingCart from './components/pages/ShoppingCart'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/*' element={<Homepage order={[]}/>} />
        <Route path='shopping-cart' element={<ShoppingCart order={[]}/>} />
      </Routes>
    </>
  )
}

export default App
