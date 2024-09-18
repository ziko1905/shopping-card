import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <h1>Awesome store</h1>
      <Outlet />
    </>
  )
}

export default App
