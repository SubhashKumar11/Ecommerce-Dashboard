import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Nav from './Components/Nav'
import Home from './Components/Home'
import Footer from './Components/Footer'
import Signup from './Components/Signup'
import PrivateComp from './Components/PrivateComp'
import Login from './Components/Login'
import Add_products from './Components/Add_products'
import ProductList from './Components/ProductList'
import UpdateProduct from './Components/UpdateProduct'
const App = () => {
  return (
    <>
    <BrowserRouter>
    <Nav/>
<Routes>
  <Route element={<PrivateComp/>}>
  <Route exact path='/' element={<ProductList/>}></Route>
  <Route path='/add' element={<Add_products/>}></Route>
  <Route path='/update/:id' element={<UpdateProduct/>}></Route>
  <Route path='/logout' element={<Home/>}></Route>
  <Route path='/profile' element={<Home/>}></Route>
  </Route>
  <Route path='/signup' element={<Signup/>}></Route>
  <Route path='/login' element={<Login/>}></Route>
</Routes>
    </BrowserRouter>
<Footer/>
    </>
  )
}

export default App