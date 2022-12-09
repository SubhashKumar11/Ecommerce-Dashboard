import react from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
//if user is aready login,then signup page dont work so we use useEffect to handle this
  useEffect(() => {
    const auth = localStorage.getItem("user");  
if(auth){
  navigate("/")
}
  })

  const collectdata = async () => {
    // console.warn(name,email,password)
    const result = await fetch("http://localhost:9000/register", {
      method: "post", //using which method you want to fetch data
      body: JSON.stringify({ name, email, password }), //what things i need to sent to backend
      headers: {
        "content-Type": "application/json",
      },
    });
    //only use to see whether data send to backend or not
    const results = await result.json();
    console.warn(results);
    //if data sending to backend sucess then
    localStorage.setItem("user",JSON.stringify(result));  //not mandotory ,only use to store data in localstorage of chrome
    if (result) {
      navigate("/");
    }
  };
  return (
    <>
      <div className="register">
        <h1>Register</h1>
        <input
          className="input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          type="text"
          placeholder="Enter name"
        />
        <input
          className="input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="text"
          placeholder="Enter Email"
        />
        <input
          className="input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Enter password"
        />
        <button onClick={collectdata} className="signup-btn">
          Signup
        </button>
      </div>
    </>
  );
};
export default Signup;
