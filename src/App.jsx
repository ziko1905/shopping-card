import './App.css'
import Navbar from './components/Navbar'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Homepage from './components/pages/Homepage'
import ShoppingCart from './components/pages/ShoppingCart'
import ErrorPage from './components/pages/ErrorPage.jsx'
import Checkout from './components/pages/Checkout.jsx'



function App({productListUrl='https://fakestoreapi.com/products/'}) {
  const [order, setOrder] = useState([])
  const [productList, setProductList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(productListUrl).then(response => response.json())
    .then(response => setProductList(response))
    .catch(() => {
      navigate("/error-page")
    })
  }, [])
  

  return (
    <>
      <Navbar itemsNum={order.length}/>
      <Routes>
        <Route path='/' element={<Homepage orderCallback={setOrder} order={order}  productList={productList} />} /> 
        <Route path='shopping-cart' element={<ShoppingCart orderCallback={setOrder} order={order}/>} />
        <Route path='*' element={<ErrorPage />} />
        <Route path='checkout' element={<Checkout orderCallback={setOrder}/>} />
      </Routes>
    </>
  )
}

export default App
