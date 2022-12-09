import React from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'
const Nav = () => {
  const auth = localStorage.getItem("user"); //this concept use in last li of return
  const navigate = useNavigate();
  const logout = ()=>{
localStorage.clear();
navigate('/signup')
  }
  return (
    <div>
      {
      auth ?
      <ul className='nav-ul'>
        <li><Link to="/">Product</Link></li>
        <li><Link to="/add">Add Product</Link></li>
        <li><Link to="/update">Update Product</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link onClick={logout} to="/signup">Logout{JSON.parse(auth).name}</Link></li>
</ul>
       //{/* <li>{ auth ? <Link onClick={logout} to="/signup">Logout</Link> : <Link to="/signup">Signup</Link>}</li>
       // <li><Link to="/login">Login</Link></li> */}
        :
      <ul className='nav-ul'>
 <li> <Link to="/signup">Signup</Link></li>
 <li><Link to="/login">Login</Link></li>
 </ul>
 }
    </div>
  )
}

export default Nav
