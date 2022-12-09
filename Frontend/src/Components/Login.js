import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        const auth = localStorage.getItem("user");  
    if(auth){
      navigate("/")
    }
      },[])
    const handleLogin = async ()=>{
        console.warn(email,password)
        let result = await fetch("http://localhost:5000/login",{
            method:"post",
            body : JSON.stringify({email,password}),
            headers: {
                "content-Type": "application/json",
              }
        })
   result = await result.json();
   console.warn(result)
   if(result.auth){
localStorage.setItem("user",JSON.stringify(result.user))
localStorage.setItem("token",JSON.stringify(result.auth))
navigate('/')
   }else{
    alert("please enter correct detail")
   }
    }
  return (
  <div className="login">
    <h1>Login Page</h1>
    <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} className='inputBox' placeholder='enter mail' />
    <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='inputBox' placeholder='enter password' />
    <button type="button" onClick={handleLogin} className="signup-btn">Login</button>
  </div>
  )
}

export default Login