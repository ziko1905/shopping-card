import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Homepage from './components/pages/Homepage'
import ShoppingCart from './components/pages/ShoppingCart'
import { useEffect, useState } from 'react'

function App() {
  const [order, setOrder] = useState([])
  const [productList, setProductList] = useState([])
  
  useEffect(() => {
    fetch('https://fakestoreapi.com/products/').then(response => response.json())
    .then(response => setProductList(response))
  }, [])
  

  return (
    <>
      <Navbar itemsNum={order.length}/>
      <Routes>
        <Route path='/' element={<Homepage orderCallback={setOrder} order={order} productList={productList} />} />
        <Route path='shopping-cart' element={<ShoppingCart orderCallback={setOrder} order={order}/>} />
      </Routes>
    </>
  )
}

export default App
