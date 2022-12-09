import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
const ProductList = () => {
    const[products,setProducts] = useState([])
    useEffect(() => {
        getProducts();
    
    }, [])
const getProducts=async()=>{
    //api call
    let result = await fetch('http://localhost:9000/products',{
      headers:{
authorization :JSON.parse(localStorage.getItem('token'))
      }
    })
    result = await result.json();
    setProducts(result)

}
const deleteProduct = async(id)=>{
  //  console.warn(id);
  let result = await fetch(`http://localhost:9000/product/${id}` ,{
    method:"Delete"
  
  });
     result = await result.json();
     if(result){
        //alert("record deleted")
        getProducts();
     }
}
const searchHandle = async (event)=>{
  //  console.warn(event.target.value)  use for checking purpose
  //api call
  let key = event.target.value; //to target and get single value
  if(key){
    let result = await fetch(`http://localhost:9000/search/${key}`);
    result = await result.json();
    if(result){
      setProducts(result);
    }
    console.log(result);
  }
 else{
    getProducts();
 }
}
return (
    <div className='product-list'>
        <h1>ProductList</h1>
        <input className='search-box' type="text" placeholder='search product...' onChange={searchHandle} />
        <ul>
            <li>S.No.</li>
            <li>Name</li>
            <li>Price</li>
            <li>Category</li>
            <li>Operation</li>
            <li>Update</li>
            
        </ul>
        {
         products.length ?   products.map((item,index)=>
            <ul key={item._id}>
            <li>{index+1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li><button onClick={()=>deleteProduct(item._id)}>Delete</button></li>
            <li><Link to={'/update/'+item._id}>Update</Link></li>
        </ul>
            )
            :<h1>Oops! No result found</h1>
        }
    </div>
  )
}

export default ProductList