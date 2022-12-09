import React from 'react'
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import './App.css'
const Add_products = () => {
  const navigate = useNavigate();
    const [name,setName] = useState('');
    const [company,setCompany] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [error,setError] = useState(false)
    const addProduct = async()=>{
     //   console.warn(name,company,price,category);//step use for test
     if (!name || !price || !category || !company) {
      setError(true)
      return false;
     } else {
      
     }
     const userId = JSON.parse(localStorage.getItem('user'))._id;
     let result = await fetch("http://localhost:9000/add-product",{
      method:"post",
      body:JSON.stringify({name,price,category,company,userId}),
      headers:{
        "Content-Type":"application/json"
      }
      
     })   

     result = await result.json();
     console.warn(result);
     navigate('/')

    }
  return (
    <div className='product'>
        <h1>Add_products</h1>
        <input value={name} className='inputBox' type="text" placeholder="Enter product name" onChange={(e)=>{setName(e.target.value)}} />
        {error && !name && <span className='spans'>Enter valid name</span>} {/*error line span showing when we left to fill all columns */}
        <input value={price} className='inputBox' type="text" placeholder="Enter product price" onChange={(e)=>{setPrice(e.target.value)}} />
        {error && !price && <span className='spans'>Enter valid price</span>}
        <input value={category} className='inputBox' type="text" placeholder="Enter product category" onChange={(e)=>{setCategory(e.target.value)}}/>
        {error && !category && <span className='spans'>Enter valid category</span>}
        <input value={company} className='inputBox' type="text" placeholder="Enter product company" onChange={(e)=>{setCompany(e.target.value)}} />
        {error && !company && <span className='spans'>Enter valid company</span>}
        <button onClick={addProduct} className='signup-btn'>Add Product</button>
    </div>
  )
}

export default Add_products