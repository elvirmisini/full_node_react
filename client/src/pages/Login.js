import React, { useState,useContext } from 'react'
import { useNavigate, } from 'react-router-dom'
import axios from 'axios'
import {AuthContext} from "../helpers/AuthContext"

function Login() {
const [username,setUsername]=useState("")
const [password,setPassword]=useState("")
const {setAuthState}=useContext(AuthContext)


let history=useNavigate()
  const login=()=>{
    const data={username:username,password:password}
    axios.post("http://localhost:3001/users/login",data).then((response)=>{
      if(response.data.error){
      alert(response.data.error)
    }else{
      localStorage.setItem("accessToken",response.data.token)
      setAuthState({username:response.data.username,
        id:response.data.id,
        status:true})
      history('/')
    }
      });
  }
  return (
    <div>
      <input type='text' onChange={(event)=>setUsername(event.target.value) }></input>
      <input type='password' onChange={(event)=>setPassword(event.target.value) }></input>

      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login
