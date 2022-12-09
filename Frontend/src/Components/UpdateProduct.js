import React from 'react'
import { useState } from 'react'
import { useParams ,useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
const UpdateProduct = () => {
    const [name,setName] = useState('');
    const [company,setCompany] = useState('');
    const [price,setPrice] = useState('');
    const [category,setCategory] = useState('');
    const [error,setError] = useState(false)
    const params = useParams();
    const navigate = useNavigate()
    useEffect(() => {
      //console.warn(params)
      //api call
      getProductDetails();
    },[]);
    const getProductDetails = async ()=>{
      console.warn(params)
      let result = await fetch(`http://localhost:9000/product/${params.id}`)
      result = await result.json()
      //below mention lines automatically fill require filled in box to edit
      setName(result.name)
      setPrice(result.price)
      setCategory(result.category)
      setCompany(result.company)

      console.warn(result)
    }
    const UpdateProducts = async()=>{
      let result = await fetch(`http://localhost:9000/product/${params.id}` ,{
        method:'put',
        body:JSON.stringify({name,price,category,company}),
        headers:{
          'content-Type':"application/json"
        }
      })
      result = await result.json()
     console.log(result)
     navigate('/');
    }
  return (
    <div className='product'>
        <h1>UpdateProduct</h1>
        <input value={name} className='inputBox' type="text" placeholder="Enter product name" onChange={(e)=>{setName(e.target.value)}} />
        <input value={price} className='inputBox' type="text" placeholder="Enter product price" onChange={(e)=>{setPrice(e.target.value)}} />
        <input value={category} className='inputBox' type="text" placeholder="Enter product category" onChange={(e)=>{setCategory(e.target.value)}}/>
        <input value={company} className='inputBox' type="text" placeholder="Enter product company" onChange={(e)=>{setCompany(e.target.value)}} />
        <button onClick={UpdateProducts} className='signup-btn'>Update Product</button>
    </div>
  )
}

export default UpdateProduct