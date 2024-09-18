import './App.css'
import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar itemsNum={"10"}/>
      <h1>Awesome store</h1>
      <Outlet />
    </>
  )
}

export default App
